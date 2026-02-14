import { useState, useEffect, useCallback } from "react";
import { getRandomWord, getLevel } from "./words.js";
import { getTheme, containerStyle } from "./styles.js";
import { useDevice } from "./useDevice.js";

// ─── Screens ───
import LoginScreen from "./screens/LoginScreen.jsx";
import MenuScreen from "./screens/MenuScreen.jsx";
import LeaderboardScreen from "./screens/LeaderboardScreen.jsx";
import GameScreen from "./screens/GameScreen.jsx";
import VersusSetupScreen from "./screens/VersusSetupScreen.jsx";

// ─── System dark mode hook ───
function useSystemDarkMode() {
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setPrefersDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersDark;
}

// ─── Main App ───
export default function LastLetter() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser] = useState(null);
  const [loginName, setLoginName] = useState("");
  const [loginAge, setLoginAge] = useState("");
  const [loginError, setLoginError] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // Game state
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [visualStyle, setVisualStyle] = useState("classic");
  const [currentWord, setCurrentWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [usePhonicsClusters, setUsePhonicsClusters] = useState(true);
  const [isVersusMode, setIsVersusMode] = useState(false);

  const maxWrong = gameMode === "children" ? 8 : difficulty === "challenge" ? 6 : 8;
  const isChild = user && user.age < 13;
  const prefersDark = useSystemDarkMode();
  const theme = getTheme(isChild, gameMode, prefersDark);
  const deviceInfo = useDevice();

  // ─── Storage ───
  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      if (raw) {
        const u = JSON.parse(raw);
        if (u) { setUser(u); setScore(u.score || 0); setStreak(u.streak || 0); }
      }
    } catch (e) {}
    try {
      const raw = localStorage.getItem("allUsers");
      if (raw) setAllUsers(JSON.parse(raw));
    } catch (e) {}
    setScreen("login");
  }, []);

  const saveUser = useCallback((u) => {
    try {
      localStorage.setItem("currentUser", JSON.stringify(u));
      setAllUsers((prev) => {
        const idx = prev.findIndex((p) => p.name.toLowerCase() === u.name.toLowerCase());
        const next = idx >= 0 ? [...prev.slice(0, idx), u, ...prev.slice(idx + 1)] : [...prev, u];
        localStorage.setItem("allUsers", JSON.stringify(next));
        return next;
      });
    } catch (e) {}
  }, []);

  // ─── Auth ───
  const handleLogin = () => {
    const name = loginName.trim();
    const age = parseInt(loginAge);
    if (!name) { setLoginError("Please enter your name"); return; }
    if (!loginAge || isNaN(age) || age < 3 || age > 120) { setLoginError("Please enter a valid age (3-120)"); return; }

    let existing = null;
    try {
      const raw = localStorage.getItem(`user_${name.toLowerCase()}`);
      if (raw) existing = JSON.parse(raw);
    } catch (e) {}

    const u = existing || { name, age, score: 0, streak: 0, gamesPlayed: 0, gamesWon: 0 };
    if (!existing) { u.age = age; localStorage.setItem(`user_${name.toLowerCase()}`, JSON.stringify(u)); }
    setUser(u); setScore(u.score || 0); setStreak(u.streak || 0);
    saveUser(u);
    setScreen("menu");
  };

  const handleLogout = () => {
    try { localStorage.removeItem("currentUser"); } catch (e) {}
    setUser(null); setLoginName(""); setLoginAge(""); setLoginError("");
    setScreen("login");
  };

  // ─── Game logic ───
  const startGame = (mode, diff) => {
    setGameMode(mode);
    setDifficulty(diff);
    setVisualStyle(mode === "children" ? "blocks" : "classic");
    setIsVersusMode(false);
    pickNewWord(mode, diff);
    setScreen("game");
  };

  const startVersusMode = () => {
    setIsVersusMode(true);
    setScreen("versusSetup");
  };

  const startVersusGame = (customWord) => {
    setGameMode("adult");
    setDifficulty("standard");
    setVisualStyle("classic");
    setCurrentWord(customWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
    setShowHint(false);
    setHintUsed(false);
    setScreen("game");
  };

  const pickNewWord = (mode, diff) => {
    const level = getLevel(mode, diff);
    const word = getRandomWord(level);
    setCurrentWord(word);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
    setShowHint(false);
    setHintUsed(false);
  };

  const calculateScore = () => {
    const baseScore = currentWord.word.length * 10;
    const wrongPenalty = wrongGuesses * 5;
    const hintPenalty = hintUsed ? 15 : 0;
    const streakBonus = streak * 5;
    const difficultyMultiplier = difficulty === "challenge" || difficulty === "hard" ? 2 : difficulty === "medium" ? 1.5 : 1;
    return Math.max(5, Math.round((baseScore - wrongPenalty - hintPenalty + streakBonus) * difficultyMultiplier));
  };

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    letter.split("").forEach((c) => newGuessed.add(c));
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const wordLetters = currentWord.word.split("");
    const isCorrect = letter.length > 1 ? currentWord.word.includes(letter) : wordLetters.includes(letter);

    if (!isCorrect) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= maxWrong) {
        setGameStatus("lost");
        if (!isVersusMode) {
          setStreak(0);
          const updated = { ...user, streak: 0, gamesPlayed: (user.gamesPlayed || 0) + 1 };
          setUser(updated); saveUser(updated);
          localStorage.setItem(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
        }
      }
    } else {
      const allRevealed = wordLetters.every((c) => newGuessed.has(c));
      if (allRevealed) {
        setGameStatus("won");
        if (!isVersusMode) {
          const wordScore = calculateScore();
          const newScore = score + wordScore;
          const newStreak = streak + 1;
          setScore(newScore); setStreak(newStreak);
          const updated = {
            ...user, score: newScore, streak: newStreak,
            gamesPlayed: (user.gamesPlayed || 0) + 1,
            gamesWon: (user.gamesWon || 0) + 1,
          };
          setUser(updated); saveUser(updated);
          localStorage.setItem(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
        }
      }
    }
  };

  // ─── Render ───
  if (screen === "loading") {
    return (
      <div style={{ ...containerStyle(theme, deviceInfo), justifyContent: "center" }}>
        <div style={{ fontSize: deviceInfo.titleFontSize, fontWeight: 700 }}>Loading...</div>
      </div>
    );
  }

  if (screen === "login") {
    return (
      <LoginScreen
        loginName={loginName} setLoginName={setLoginName}
        loginAge={loginAge} setLoginAge={setLoginAge}
        loginError={loginError} setLoginError={setLoginError}
        onLogin={handleLogin}
        prefersDark={prefersDark}
        layout={deviceInfo}
      />
    );
  }

  if (screen === "menu") {
    return (
      <MenuScreen
        theme={theme} user={user} isChild={isChild}
        score={score} streak={streak}
        onStartGame={startGame} onLogout={handleLogout}
        onLeaderboard={() => setScreen("leaderboard")}
        onVersusMode={startVersusMode}
        layout={deviceInfo}
      />
    );
  }

  if (screen === "versusSetup") {
    return (
      <VersusSetupScreen
        theme={theme}
        onStartGame={startVersusGame}
        onBack={() => setScreen("menu")}
        layout={deviceInfo}
      />
    );
  }

  if (screen === "leaderboard") {
    return (
      <LeaderboardScreen
        theme={theme} allUsers={allUsers}
        currentUserName={user?.name}
        onBack={() => setScreen("menu")}
        layout={deviceInfo}
      />
    );
  }

  if (screen === "game" && currentWord) {
    return (
      <GameScreen
        theme={theme} gameMode={gameMode} difficulty={difficulty}
        visualStyle={visualStyle} setVisualStyle={setVisualStyle}
        currentWord={currentWord} guessedLetters={guessedLetters}
        wrongGuesses={wrongGuesses} maxWrong={maxWrong}
        gameStatus={gameStatus} score={score} streak={streak}
        showHint={showHint} hintUsed={hintUsed}
        usePhonicsClusters={usePhonicsClusters}
        setUsePhonicsClusters={setUsePhonicsClusters}
        isVersusMode={isVersusMode}
        onGuess={handleGuess}
        onShowHint={() => { setShowHint(true); setHintUsed(true); }}
        onNextWord={() => pickNewWord(gameMode, difficulty)}
        onMenu={() => setScreen("menu")}
        calculateScore={calculateScore}
        layout={deviceInfo}
      />
    );
  }

  return null;
}
