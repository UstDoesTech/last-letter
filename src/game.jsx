import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomWord, getLevel } from "./words.js";

// ─── Phonics clusters for children ───
const PHONICS_CLUSTERS = ["SH", "CH", "TH", "PH", "WH", "CK", "QU", "NG", "GH", "KN", "WR", "EE", "OO", "AI", "EA", "OA", "OU", "OW", "IGH"];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── SVG Drawing Components ───
function HangmanDrawing({ wrongGuesses, maxWrong }) {
  const parts = [
    <line key="base" x1="20" y1="180" x2="100" y2="180" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="pole" x1="60" y1="180" x2="60" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="top" x1="60" y1="20" x2="140" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="rope" x1="140" y1="20" x2="140" y2="45" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />,
    <circle key="head" cx="140" cy="60" r="15" stroke="#4a3728" strokeWidth="3" fill="none" />,
    <line key="body" x1="140" y1="75" x2="140" y2="120" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="larm" x1="140" y1="85" x2="115" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="rarm" x1="140" y1="85" x2="165" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="lleg" x1="140" y1="120" x2="115" y2="150" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="rleg" x1="140" y1="120" x2="165" y2="150" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
  ];

  const partsPerWrong = parts.length / maxWrong;
  const showCount = Math.ceil(wrongGuesses * partsPerWrong);

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {parts.slice(0, showCount)}
      {wrongGuesses >= maxWrong && (
        <>
          <line x1="133" y1="55" x2="137" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="137" y1="55" x2="133" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="143" y1="55" x2="147" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="147" y1="55" x2="143" y2="63" stroke="#c0392b" strokeWidth="2" />
          <path d="M133 68 Q140 74 147 68" stroke="#c0392b" strokeWidth="2" fill="none" />
        </>
      )}
      {wrongGuesses < maxWrong && showCount >= 5 && (
        <>
          <circle cx="135" cy="57" r="2" fill="#4a3728" />
          <circle cx="145" cy="57" r="2" fill="#4a3728" />
          {wrongGuesses >= maxWrong - 2 ? (
            <path d="M134 67 Q140 63 146 67" stroke="#4a3728" strokeWidth="1.5" fill="none" />
          ) : (
            <line x1="135" y1="66" x2="145" y2="66" stroke="#4a3728" strokeWidth="1.5" />
          )}
        </>
      )}
    </svg>
  );
}

// Adult alternate: A large letter "Z" that progressively erases/dissolves
function LetterFadeDrawing({ wrongGuesses, maxWrong }) {
  const remaining = maxWrong - wrongGuesses;
  const segments = maxWrong;

  // The letter is built from small tile fragments that disappear
  const cols = 5;
  const rows = 7;
  const tiles = [];
  // "Z" shape in a 5x7 grid
  const zShape = [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (zShape[r][c]) tiles.push({ r, c });
    }
  }

  // How many tiles to keep visible
  const tilesToShow = Math.ceil((remaining / maxWrong) * tiles.length);
  const baseColors = ["#58A6FF", "#79B8FF", "#388BFD", "#1F6FEB", "#58A6FF"];

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {/* Subtle grid background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={20 + i * 22} x2="180" y2={20 + i * 22} stroke="#21262D" strokeWidth="0.5" opacity="0.5" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={30 + i * 30} y1="10" x2={30 + i * 30} y2="190" stroke="#21262D" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Letter tiles */}
      {tiles.map((tile, i) => {
        const visible = i < tilesToShow;
        const x = 40 + tile.c * 26;
        const y = 22 + tile.r * 22;
        const color = baseColors[tile.c % baseColors.length];
        return visible ? (
          <g key={i}>
            <rect x={x} y={y} width="22" height="18" rx="3" fill={color} opacity={0.85 - (i / tiles.length) * 0.2} />
            <rect x={x + 1} y={y + 1} width="20" height="4" rx="1" fill="white" opacity="0.15" />
          </g>
        ) : (
          <g key={i}>
            <rect x={x} y={y} width="22" height="18" rx="3" fill="none" stroke="#30363D" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
          </g>
        );
      })}

      {/* Status text */}
      {wrongGuesses >= maxWrong && (
        <text x="100" y="195" textAnchor="middle" fontSize="11" fill="#F85149" fontWeight="700" fontFamily="monospace">
          LETTERS LOST
        </text>
      )}
      {wrongGuesses === 0 && (
        <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#7D8590" fontFamily="monospace">
          Don't lose your letters!
        </text>
      )}
    </svg>
  );
}

// Children: Alphabet blocks that topple over
function AlphabetBlocksDrawing({ wrongGuesses, maxWrong, won }) {
  const remaining = maxWrong - wrongGuesses;
  const letters = "ABCDEFGH".slice(0, maxWrong).split("");

  const blockColors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B8A", "#845EC2", "#FF9671", "#FFC75F"];

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {/* Ground / shelf */}
      <rect x="10" y="168" width="180" height="8" rx="4" fill="#D2691E" />
      <rect x="10" y="172" width="180" height="4" rx="2" fill="#8B4513" opacity="0.6" />

      {/* Letter blocks stacked/arranged */}
      {letters.map((letter, i) => {
        const alive = i < remaining;
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 25 + col * 42;
        const y = alive ? (130 - row * 50) : (172);
        const color = blockColors[i % blockColors.length];
        const fallen = !alive;

        return (
          <g key={i} transform={fallen ? `rotate(${15 + i * 12}, ${x + 16}, ${y + 16})` : ""} opacity={fallen ? 0.3 : 1}>
            {/* Block shadow */}
            {alive && <rect x={x + 2} y={y + 2} width="34" height="34" rx="5" fill="black" opacity="0.1" />}
            {/* Block */}
            <rect x={x} y={y} width="34" height="34" rx="5"
              fill={fallen ? "#BDBDBD" : color} stroke={fallen ? "#9E9E9E" : color} strokeWidth="1" />
            {/* Shine */}
            {alive && <rect x={x + 2} y={y + 2} width="30" height="8" rx="3" fill="white" opacity="0.25" />}
            {/* Letter on block */}
            <text x={x + 17} y={y + 24} textAnchor="middle" fontSize="20" fontWeight="800"
              fill={fallen ? "#E0E0E0" : "white"} fontFamily="'Courier Prime', monospace">
              {letter}
            </text>
          </g>
        );
      })}

      {/* Sparkles when won */}
      {won && ["✨", "🌟", "⭐", "✨", "🌟", "⭐"].map((s, i) => (
        <text key={i} x={20 + i * 30} y={30 + (i % 3) * 20} fontSize="14" opacity={0.8}
          style={{ animation: `sparkle ${1 + i * 0.3}s ease-in-out infinite alternate` }}>{s}</text>
      ))}

      {/* Lost face */}
      {wrongGuesses >= maxWrong && (
        <text x="100" y="125" textAnchor="middle" fontSize="28">😵</text>
      )}
    </svg>
  );
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
  const [gameMode, setGameMode] = useState(null); // "children" | "adult"
  const [difficulty, setDifficulty] = useState(null);
  const [visualStyle, setVisualStyle] = useState("classic"); // "classic" | "blocks" | "letterFade"
  const [currentWord, setCurrentWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // "playing" | "won" | "lost"
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [usePhonicsClusters, setUsePhonicsClusters] = useState(true);

  const maxWrong = gameMode === "children" ? 8 : difficulty === "challenge" ? 6 : 8;

  // ─── Storage ───
  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      if (raw) {
        const u = JSON.parse(raw);
        if (u) {
          setUser(u);
          setScore(u.score || 0);
          setStreak(u.streak || 0);
        }
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
      setAllUsers(prev => {
        const idx = prev.findIndex(p => p.name.toLowerCase() === u.name.toLowerCase());
        const next = idx >= 0 ? [...prev.slice(0, idx), u, ...prev.slice(idx + 1)] : [...prev, u];
        localStorage.setItem("allUsers", JSON.stringify(next));
        return next;
      });
    } catch (e) {}
  }, []);

  const handleLogin = () => {
    const name = loginName.trim();
    const age = parseInt(loginAge);
    if (!name) { setLoginError("Please enter your name"); return; }
    if (!loginAge || isNaN(age) || age < 3 || age > 120) { setLoginError("Please enter a valid age (3-120)"); return; }

    // Check for existing user
    let existing = null;
    try {
      const raw = localStorage.getItem(`user_${name.toLowerCase()}`);
      if (raw) existing = JSON.parse(raw);
    } catch (e) {}

    const u = existing || { name, age, score: 0, streak: 0, gamesPlayed: 0, gamesWon: 0 };
    if (!existing) {
      u.age = age;
      localStorage.setItem(`user_${name.toLowerCase()}`, JSON.stringify(u));
    }
    setUser(u);
    setScore(u.score || 0);
    setStreak(u.streak || 0);
    saveUser(u);
    setScreen("menu");
  };

  const handleLogout = () => {
    try { localStorage.removeItem("currentUser"); } catch (e) {}
    setUser(null);
    setLoginName("");
    setLoginAge("");
    setLoginError("");
    setScreen("login");
  };

  const isChild = user && user.age < 13;

  const startGame = (mode, diff) => {
    setGameMode(mode);
    setDifficulty(diff);
    if (mode === "children") {
      setVisualStyle("blocks");
    } else {
      setVisualStyle("classic");
    }
    pickNewWord(mode, diff);
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

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    // For phonics clusters, add each character
    letter.split("").forEach(c => newGuessed.add(c));
    newGuessed.add(letter); // also add the cluster itself for tracking
    setGuessedLetters(newGuessed);

    const wordLetters = currentWord.word.split("");
    const isCorrect = letter.length > 1
      ? currentWord.word.includes(letter)
      : wordLetters.includes(letter);

    if (!isCorrect) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= maxWrong) {
        setGameStatus("lost");
        const newStreak = 0;
        setStreak(newStreak);
        const updated = { ...user, streak: newStreak, gamesPlayed: (user.gamesPlayed || 0) + 1 };
        setUser(updated);
        saveUser(updated);
        localStorage.setItem(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
      }
    } else {
      // Check if won
      const allRevealed = wordLetters.every(c => newGuessed.has(c));
      if (allRevealed) {
        setGameStatus("won");
        const wordScore = calculateScore();
        const newScore = score + wordScore;
        const newStreak = streak + 1;
        setScore(newScore);
        setStreak(newStreak);
        const updated = {
          ...user,
          score: newScore,
          streak: newStreak,
          gamesPlayed: (user.gamesPlayed || 0) + 1,
          gamesWon: (user.gamesWon || 0) + 1,
        };
        setUser(updated);
        saveUser(updated);
        localStorage.setItem(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
      }
    }
  };

  const calculateScore = () => {
    const baseScore = currentWord.word.length * 10;
    const wrongPenalty = wrongGuesses * 5;
    const hintPenalty = hintUsed ? 15 : 0;
    const streakBonus = streak * 5;
    const difficultyMultiplier = difficulty === "challenge" || difficulty === "hard" ? 2 : difficulty === "medium" ? 1.5 : 1;
    return Math.max(5, Math.round((baseScore - wrongPenalty - hintPenalty + streakBonus) * difficultyMultiplier));
  };

  const renderWord = () => {
    if (!currentWord) return null;
    const len = currentWord.word.length;
    const baseWidth = gameMode === "children" ? 42 : 36;
    const baseHeight = gameMode === "children" ? 50 : 44;
    const baseFontSize = gameMode === "children" ? 26 : 22;
    const maxContainerWidth = 480;
    const gap = 6; // margin (3px each side)
    const totalNeeded = len * (baseWidth + gap);
    const scale = totalNeeded > maxContainerWidth ? maxContainerWidth / totalNeeded : 1;
    const tileWidth = Math.floor(baseWidth * scale);
    const tileHeight = Math.floor(baseHeight * scale);
    const tileFontSize = Math.floor(baseFontSize * scale);
    const tileMargin = Math.max(1, Math.floor(3 * scale));

    return currentWord.word.split("").map((letter, i) => {
      const revealed = guessedLetters.has(letter) || gameStatus === "lost";
      return (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: tileWidth, height: tileHeight,
          margin: `0 ${tileMargin}px`,
          borderBottom: `${Math.max(2, Math.floor(3 * scale))}px solid ${revealed ? (gameStatus === "lost" && !guessedLetters.has(letter) ? "#e74c3c" : "var(--accent)") : "var(--text-dim)"}`,
          fontSize: tileFontSize,
          fontWeight: 700,
          fontFamily: "'Courier Prime', 'Courier New', monospace",
          color: gameStatus === "lost" && !guessedLetters.has(letter) ? "#e74c3c" : "var(--text)",
          transition: "all 0.3s ease",
        }}>
          {revealed ? letter : ""}
        </span>
      );
    });
  };

  const getKeyboardLetters = () => {
    if (gameMode === "children" && usePhonicsClusters) {
      const relevantPh = PHONICS_CLUSTERS.filter(ph =>
        currentWord && currentWord.word.includes(ph)
      );
      const extraPh = PHONICS_CLUSTERS.filter(ph =>
        !relevantPh.includes(ph)
      ).slice(0, Math.max(0, 4 - relevantPh.length));
      const phonics = [...relevantPh, ...extraPh];
      return { letters: ALPHABET, phonics };
    }
    return { letters: ALPHABET, phonics: [] };
  };

  const renderKeyboard = () => {
    const { letters, phonics } = getKeyboardLetters();
    const rows = [
      letters.slice(0, 9),
      letters.slice(9, 18),
      letters.slice(18),
    ];

    const renderKey = (key, isPhonics = false) => {
      const isGuessed = key.length > 1
        ? key.split("").every(c => guessedLetters.has(c))
        : guessedLetters.has(key);
      const isInWord = currentWord && (key.length > 1 ? currentWord.word.includes(key) : currentWord.word.includes(key));
      const wasWrong = isGuessed && !isInWord;
      const wasRight = isGuessed && isInWord;

      return (
        <button key={key} onClick={() => handleGuess(key)}
          disabled={isGuessed || gameStatus !== "playing"}
          style={{
            width: isPhonics ? 52 : 38, height: 42,
            margin: 2,
            border: "none",
            borderRadius: 8,
            fontSize: isPhonics ? 13 : 15,
            fontWeight: 700,
            fontFamily: "'Courier Prime', 'Courier New', monospace",
            cursor: isGuessed || gameStatus !== "playing" ? "default" : "pointer",
            transition: "all 0.2s ease",
            background: wasRight ? "var(--correct)" : wasWrong ? "var(--wrong)" : isGuessed ? "var(--key-used)" : isPhonics ? "var(--phonics-bg)" : "var(--key-bg)",
            color: wasRight || wasWrong ? "white" : isGuessed ? "var(--text-dim)" : isPhonics ? "var(--phonics-text)" : "var(--text)",
            opacity: isGuessed ? 0.5 : 1,
            boxShadow: isGuessed ? "none" : "0 2px 4px rgba(0,0,0,0.15)",
            transform: isGuessed ? "scale(0.95)" : "scale(1)",
          }}
        >
          {key}
        </button>
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        {phonics.length > 0 && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginBottom: 4, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Phonics
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {phonics.map(p => renderKey(p, true))}
            </div>
          </div>
        )}
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            {row.map(l => renderKey(l))}
          </div>
        ))}
      </div>
    );
  };

  // ─── Screens ───

  const theme = isChild || gameMode === "children" ? {
    "--bg": "#FFF8E7",
    "--bg-card": "#FFFFFF",
    "--text": "#3E2723",
    "--text-dim": "#A1887F",
    "--accent": "#FF6F00",
    "--accent-light": "#FFE0B2",
    "--correct": "#43A047",
    "--wrong": "#E53935",
    "--key-bg": "#FFF3E0",
    "--key-used": "#EFEBE9",
    "--phonics-bg": "#E8F5E9",
    "--phonics-text": "#2E7D32",
    "--border": "#FFE0B2",
    "--btn-primary": "#FF6F00",
    "--btn-primary-hover": "#E65100",
    "--btn-secondary": "#FFF3E0",
    "--shadow": "0 4px 20px rgba(255, 111, 0, 0.08)",
  } : {
    "--bg": "#0D1117",
    "--bg-card": "#161B22",
    "--text": "#E6EDF3",
    "--text-dim": "#7D8590",
    "--accent": "#58A6FF",
    "--accent-light": "#1F3A5F",
    "--correct": "#3FB950",
    "--wrong": "#F85149",
    "--key-bg": "#21262D",
    "--key-used": "#161B22",
    "--phonics-bg": "#1F3A5F",
    "--phonics-text": "#58A6FF",
    "--border": "#30363D",
    "--btn-primary": "#238636",
    "--btn-primary-hover": "#2EA043",
    "--btn-secondary": "#21262D",
    "--shadow": "0 4px 20px rgba(0, 0, 0, 0.3)",
  };

  const containerStyle = {
    ...theme,
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "var(--bg-card)",
    borderRadius: 16,
    padding: "28px 24px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
    width: "100%",
    maxWidth: 520,
    boxSizing: "border-box",
  };

  const btnStyle = (primary = true) => ({
    padding: "12px 24px",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: primary ? "var(--btn-primary)" : "var(--btn-secondary)",
    color: primary ? "white" : "var(--text)",
    boxShadow: primary ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
    border: primary ? "none" : "1px solid var(--border)",
  });

  const inputStyle = {
    padding: "12px 16px",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    background: "var(--bg)",
    color: "var(--text)",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  if (screen === "loading") {
    return <div style={{ ...containerStyle, justifyContent: "center" }}>
      <div style={{ fontSize: 24, fontWeight: 700 }}>Loading...</div>
    </div>;
  }

  if (screen === "login") {
    return (
      <div style={containerStyle}>
        <div style={{ ...cardStyle, maxWidth: 400, marginTop: "10vh" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔤</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>
              Last Letter
            </h1>
            <p style={{ color: "var(--text-dim)", margin: 0, fontSize: 13 }}>
              Guess the word before you lose your last letter!
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "block" }}>
                Your Name
              </label>
              <input style={inputStyle} placeholder="Enter your name..." value={loginName}
                onChange={e => { setLoginName(e.target.value); setLoginError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "block" }}>
                Your Age
              </label>
              <input style={inputStyle} type="number" placeholder="Age..." value={loginAge}
                onChange={e => { setLoginAge(e.target.value); setLoginError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()} min="3" max="120" />
            </div>
            {loginError && (
              <div style={{ color: "#e74c3c", fontSize: 13, fontWeight: 600 }}>{loginError}</div>
            )}
            <button style={{ ...btnStyle(true), width: "100%", marginTop: 4 }} onClick={handleLogin}>
              Play →
            </button>
            <p style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", margin: 0 }}>
              Returning players: enter the same name to load your score
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "leaderboard") {
    const sorted = [...allUsers].filter(u => u.score > 0).sort((a, b) => b.score - a.score).slice(0, 15);
    return (
      <div style={containerStyle}>
        <div style={{ ...cardStyle, maxWidth: 440 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>🏆 Leaderboard</h2>
            <button style={btnStyle(false)} onClick={() => setScreen("menu")}>← Back</button>
          </div>
          {sorted.length === 0 ? (
            <p style={{ color: "var(--text-dim)", textAlign: "center" }}>No scores yet. Be the first!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sorted.map((u, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px", borderRadius: 10,
                  background: u.name === user?.name ? "var(--accent-light)" : "var(--bg)",
                  border: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: i < 3 ? "var(--accent)" : "var(--text-dim)", width: 28 }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                        {u.gamesWon || 0}W / {u.gamesPlayed || 0}P
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "var(--accent)" }}>{u.score}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "menu") {
    const childMode = isChild;
    return (
      <div style={containerStyle}>
        <div style={{ ...cardStyle, maxWidth: 440 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
                {childMode ? "📚" : "🔠"} Hey, {user.name}!
              </h2>
              <p style={{ color: "var(--text-dim)", margin: "4px 0 0", fontSize: 13 }}>
                Score: <b style={{ color: "var(--accent)" }}>{score}</b> · Streak: <b>{streak}</b>
              </p>
            </div>
            <button style={{ ...btnStyle(false), padding: "8px 14px", fontSize: 12 }} onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "20px 0" }} />

          {childMode ? (
            <>
              <h3 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 700 }}>
                🔤 Pick Your Challenge
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { diff: "easy", label: "✏️ Starter", desc: "3-letter words · Perfect for beginners" },
                  { diff: "medium", label: "📝 Explorer", desc: "4-5 letter words · With phonics sounds" },
                  { diff: "hard", label: "📖 Champion", desc: "Big words · Tricky spellings" },
                ].map(({ diff, label, desc }) => (
                  <button key={diff} onClick={() => startGame("children", diff)}
                    style={{
                      ...btnStyle(false), textAlign: "left", padding: "16px 18px",
                      display: "flex", flexDirection: "column", gap: 2,
                    }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>{label}</span>
                    <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{desc}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 700 }}>
                Choose Your Mode
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => startGame("adult", "standard")}
                  style={{ ...btnStyle(false), textAlign: "left", padding: "16px 18px" }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>🔠 Standard</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Interesting words · 8 letters to spare</div>
                </button>
                <button onClick={() => startGame("adult", "challenge")}
                  style={{ ...btnStyle(false), textAlign: "left", padding: "16px 18px" }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>🔥 Challenge</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Obscure &amp; tricky · Only 6 letters</div>
                </button>
              </div>
            </>
          )}

          <button onClick={() => setScreen("leaderboard")}
            style={{ ...btnStyle(false), width: "100%", marginTop: 16, textAlign: "center" }}>
            🏆 Leaderboard
          </button>
        </div>
      </div>
    );
  }

  // ─── GAME SCREEN ───
  if (screen === "game" && currentWord) {
    const visual = visualStyle === "classic"
      ? <HangmanDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} />
      : visualStyle === "blocks"
      ? <AlphabetBlocksDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} won={gameStatus === "won"} />
      : <LetterFadeDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} />;

    return (
      <div style={containerStyle}>
        {/* Top bar */}
        <div style={{ width: "100%", maxWidth: 520, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button style={{ ...btnStyle(false), padding: "8px 14px", fontSize: 12 }} onClick={() => setScreen("menu")}>
            ← Menu
          </button>
          <div style={{ display: "flex", gap: 16, fontSize: 13, fontWeight: 700 }}>
            <span>Score: <span style={{ color: "var(--accent)" }}>{score}</span></span>
            <span>Streak: <span style={{ color: "var(--correct)" }}>{streak}</span></span>
          </div>
        </div>

        <div style={{ ...cardStyle, position: "relative" }}>
          {/* Category & lives */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
              color: "var(--accent)", background: "var(--accent-light)",
              padding: "4px 10px", borderRadius: 20,
            }}>
              {currentWord.category}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: wrongGuesses >= maxWrong - 2 ? "var(--wrong)" : "var(--text-dim)" }}>
              {maxWrong - wrongGuesses} {gameMode === "children" ? "🔤" : "🔠"} left
            </span>
          </div>

          {/* Visual toggle (adults only) */}
          {gameMode === "adult" && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
              {[
                { key: "classic", label: "Classic" },
                { key: "letterFade", label: "Letter Fade" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setVisualStyle(key)}
                  style={{
                    padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    border: `1px solid ${visualStyle === key ? "var(--accent)" : "var(--border)"}`,
                    background: visualStyle === key ? "var(--accent-light)" : "transparent",
                    color: visualStyle === key ? "var(--accent)" : "var(--text-dim)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Children: Phonics toggle */}
          {gameMode === "children" && difficulty !== "easy" && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <button onClick={() => setUsePhonicsClusters(!usePhonicsClusters)}
                style={{
                  padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  border: `1px solid ${usePhonicsClusters ? "var(--accent)" : "var(--border)"}`,
                  background: usePhonicsClusters ? "var(--accent-light)" : "transparent",
                  color: usePhonicsClusters ? "var(--accent)" : "var(--text-dim)",
                  cursor: "pointer",
                }}>
                {usePhonicsClusters ? "🔤 Phonics ON" : "🔤 Phonics OFF"}
              </button>
            </div>
          )}

          {/* Drawing */}
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 16px" }}>
            {visual}
          </div>

          {/* Word display */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, gap: 2 }}>
            {renderWord()}
          </div>

          {/* Hint */}
          <div style={{ textAlign: "center", marginBottom: 16, minHeight: 28 }}>
            {showHint ? (
              <div style={{ fontSize: 13, color: "var(--text-dim)", fontStyle: "italic" }}>
                💡 {currentWord.hint}
              </div>
            ) : gameStatus === "playing" ? (
              <button onClick={() => { setShowHint(true); setHintUsed(true); }}
                style={{
                  padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: "1px dashed var(--border)", background: "transparent",
                  color: "var(--text-dim)", cursor: "pointer",
                }}>
                Need a hint? (-15 pts)
              </button>
            ) : null}
          </div>

          {/* Game over overlay */}
          {gameStatus !== "playing" && (
            <div style={{
              textAlign: "center", padding: "20px",
              background: gameStatus === "won" ? (gameMode === "children" ? "#FFF8E1" : "#0D2818") : (gameMode === "children" ? "#FFF0F0" : "#2D1117"),
              borderRadius: 12, marginBottom: 16,
              border: `1px solid ${gameStatus === "won" ? "var(--correct)" : "var(--wrong)"}`,
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>
                {gameStatus === "won"
                  ? (gameMode === "children" ? "🌟🎉🌟" : "🔤✨")
                  : (gameMode === "children" ? "😢" : "🗝️")}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                {gameStatus === "won" ? (gameMode === "children" ? "Amazing Job!" : "Well Done!") : "Game Over"}
              </div>
              {gameStatus === "won" && (
                <div style={{ fontSize: 14, color: "var(--correct)", fontWeight: 700, marginBottom: 4 }}>
                  +{calculateScore()} points!
                </div>
              )}
              {gameStatus === "lost" && (
                <div style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 4 }}>
                  The word was: <b style={{ color: "var(--wrong)" }}>{currentWord.word}</b>
                </div>
              )}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
                <button style={btnStyle(true)} onClick={() => pickNewWord(gameMode, difficulty)}>
                  {gameMode === "children" ? "Play Again! 🔤" : "Next Word →"}
                </button>
                <button style={btnStyle(false)} onClick={() => setScreen("menu")}>
                  Menu
                </button>
              </div>
            </div>
          )}

          {/* Keyboard */}
          {gameStatus === "playing" && renderKeyboard()}
        </div>
      </div>
    );
  }

  return null;
}
