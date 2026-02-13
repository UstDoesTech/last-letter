import { useState, useEffect, useCallback, useRef } from "react";

// ─── Word Banks ───
const WORD_BANKS = {
  children_easy: [
    { word: "CAT", hint: "A furry pet that purrs", category: "Animals" },
    { word: "DOG", hint: "A loyal pet that barks", category: "Animals" },
    { word: "SUN", hint: "Bright and warm in the sky", category: "Nature" },
    { word: "BIG", hint: "Not small", category: "Describing" },
    { word: "RUN", hint: "Move your legs fast", category: "Actions" },
    { word: "HAT", hint: "You wear it on your head", category: "Clothes" },
    { word: "BED", hint: "Where you sleep at night", category: "Home" },
    { word: "CUP", hint: "You drink from it", category: "Home" },
    { word: "RED", hint: "The colour of a fire engine", category: "Colours" },
    { word: "FUN", hint: "When you're having a great time", category: "Feelings" },
    { word: "MOP", hint: "Cleans the floor", category: "Home" },
    { word: "PIG", hint: "Pink farm animal", category: "Animals" },
    { word: "HEN", hint: "A chicken that lays eggs", category: "Animals" },
    { word: "BUS", hint: "Big vehicle that carries people", category: "Transport" },
    { word: "JAM", hint: "Sweet spread for toast", category: "Food" },
    { word: "NET", hint: "Used to catch fish or butterflies", category: "Things" },
    { word: "PEN", hint: "You write with it", category: "School" },
    { word: "BOX", hint: "You put things inside it", category: "Things" },
  ],
  children_medium: [
    { word: "SHIP", hint: "Sails on the ocean", category: "Transport" },
    { word: "FISH", hint: "Swims in water", category: "Animals" },
    { word: "TREE", hint: "Has leaves and branches", category: "Nature" },
    { word: "MOON", hint: "Shines at night", category: "Nature" },
    { word: "BOOK", hint: "You read stories in it", category: "School" },
    { word: "RAIN", hint: "Water falling from clouds", category: "Weather" },
    { word: "STAR", hint: "Twinkles in the night sky", category: "Nature" },
    { word: "BIRD", hint: "Has feathers and can fly", category: "Animals" },
    { word: "CAKE", hint: "Sweet treat for birthdays", category: "Food" },
    { word: "FROG", hint: "Green and hops around ponds", category: "Animals" },
    { word: "SHEEP", hint: "Woolly farm animal", category: "Animals" },
    { word: "CHAIR", hint: "You sit on it", category: "Home" },
    { word: "QUEEN", hint: "She wears a crown", category: "People" },
    { word: "TRAIN", hint: "Rides on tracks", category: "Transport" },
    { word: "CLOUD", hint: "White and fluffy in the sky", category: "Weather" },
    { word: "SHARK", hint: "Big fish with sharp teeth", category: "Animals" },
    { word: "BEACH", hint: "Sandy place by the sea", category: "Places" },
    { word: "LIGHT", hint: "Helps you see in the dark", category: "Things" },
    { word: "THUMB", hint: "The short finger on your hand", category: "Body" },
    { word: "KNIGHT", hint: "Wore armour and rode horses", category: "People" },
  ],
  children_hard: [
    { word: "BUTTERFLY", hint: "Colourful insect with big wings", category: "Animals" },
    { word: "ELEPHANT", hint: "Huge animal with a trunk", category: "Animals" },
    { word: "RAINBOW", hint: "Colourful arc after rain", category: "Nature" },
    { word: "PENGUIN", hint: "Black and white bird that waddles", category: "Animals" },
    { word: "DINOSAUR", hint: "Lived millions of years ago", category: "Animals" },
    { word: "TREASURE", hint: "Hidden gold and jewels", category: "Things" },
    { word: "DOLPHIN", hint: "Clever sea creature", category: "Animals" },
    { word: "GIRAFFE", hint: "Tallest animal on Earth", category: "Animals" },
    { word: "VOLCANO", hint: "Mountain that erupts with lava", category: "Nature" },
    { word: "ASTRONAUT", hint: "Travels to space", category: "People" },
    { word: "CHOCOLATE", hint: "Sweet brown treat", category: "Food" },
    { word: "TELEPHONE", hint: "You use it to call people", category: "Things" },
    { word: "KNOWLEDGE", hint: "What you gain from learning", category: "Ideas" },
    { word: "STRENGTH", hint: "Being very powerful", category: "Ideas" },
  ],
  adult_standard: [
    { word: "ALGORITHM", hint: "Step-by-step problem solving", category: "Tech" },
    { word: "EPHEMERAL", hint: "Lasting a very short time", category: "Vocabulary" },
    { word: "QUIXOTIC", hint: "Extremely idealistic and unrealistic", category: "Vocabulary" },
    { word: "LABYRINTH", hint: "A complex maze", category: "Places" },
    { word: "SILHOUETTE", hint: "Dark outline against light", category: "Art" },
    { word: "PNEUMONIA", hint: "Lung infection", category: "Medical" },
    { word: "RHYTHMIC", hint: "Having a strong regular beat", category: "Music" },
    { word: "SAXOPHONE", hint: "Jazz instrument", category: "Music" },
    { word: "CHRYSALIS", hint: "Butterfly cocoon stage", category: "Nature" },
    { word: "ZEITGEIST", hint: "Spirit of the times", category: "Culture" },
    { word: "JUXTAPOSE", hint: "Place side by side for contrast", category: "Vocabulary" },
    { word: "ARCHIPELAGO", hint: "Chain of islands", category: "Geography" },
    { word: "SYCOPHANT", hint: "A servile flatterer", category: "Vocabulary" },
    { word: "CLANDESTINE", hint: "Done in secret", category: "Vocabulary" },
    { word: "UBIQUITOUS", hint: "Found everywhere", category: "Vocabulary" },
    { word: "CONUNDRUM", hint: "A confusing problem", category: "Vocabulary" },
    { word: "MELANCHOLY", hint: "Deep sadness", category: "Feelings" },
    { word: "PALINDROME", hint: "Reads same forwards and back", category: "Language" },
    { word: "ANTITHESIS", hint: "The direct opposite", category: "Vocabulary" },
    { word: "KALEIDOSCOPE", hint: "Tube showing colourful patterns", category: "Things" },
  ],
  adult_challenge: [
    { word: "ONOMATOPOEIA", hint: "Words that sound like their meaning", category: "Language" },
    { word: "SERENDIPITY", hint: "Happy accident", category: "Vocabulary" },
    { word: "BOURGEOISIE", hint: "The middle class in Marxist theory", category: "Society" },
    { word: "ACQUIESCE", hint: "Accept reluctantly without protest", category: "Vocabulary" },
    { word: "HEMORRHAGE", hint: "Severe bleeding", category: "Medical" },
    { word: "BUREAUCRACY", hint: "Excessive administrative procedures", category: "Society" },
    { word: "IDIOSYNCRASY", hint: "A peculiar personal habit", category: "Vocabulary" },
    { word: "PTERODACTYL", hint: "Flying prehistoric reptile", category: "Science" },
    { word: "RECONNAISSANCE", hint: "Military observation mission", category: "Military" },
    { word: "CONSCIENTIOUS", hint: "Thorough and careful", category: "Vocabulary" },
    { word: "XYLOPHONE", hint: "Musical instrument with wooden bars", category: "Music" },
    { word: "QUEUE", hint: "A line of waiting people", category: "Vocabulary" },
    { word: "MNEMONIC", hint: "Memory aid technique", category: "Learning" },
    { word: "KNOWLEDGEABLE", hint: "Well-informed", category: "Vocabulary" },
    { word: "PSYCHEDELIC", hint: "Mind-altering visual patterns", category: "Art" },
    { word: "SURVEILLANCE", hint: "Close observation", category: "Society" },
  ],
};

// ─── Phonics clusters for children ───
const PHONICS_CLUSTERS = ["SH", "CH", "TH", "PH", "WH", "CK", "QU", "NG", "GH", "KN", "WR", "EE", "OO", "AI", "EA", "OA", "OU", "OW", "IGH"];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── SVG Drawing Components ───
function HangmanDrawing({ wrongGuesses, maxWrong }) {
  const progress = wrongGuesses / maxWrong;
  const parts = [
    // base
    <line key="base" x1="20" y1="180" x2="100" y2="180" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    // pole
    <line key="pole" x1="60" y1="180" x2="60" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    // top
    <line key="top" x1="60" y1="20" x2="140" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    // rope
    <line key="rope" x1="140" y1="20" x2="140" y2="45" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />,
    // head
    <circle key="head" cx="140" cy="60" r="15" stroke="#4a3728" strokeWidth="3" fill="none" />,
    // body
    <line key="body" x1="140" y1="75" x2="140" y2="120" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    // left arm
    <line key="larm" x1="140" y1="85" x2="115" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    // right arm
    <line key="rarm" x1="140" y1="85" x2="165" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    // left leg
    <line key="lleg" x1="140" y1="120" x2="115" y2="150" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    // right leg
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

function FlowerDrawing({ wrongGuesses, maxWrong, won }) {
  const health = Math.max(0, maxWrong - wrongGuesses);
  const maxHealth = maxWrong;
  const petalCount = Math.ceil((health / maxHealth) * 6);
  const stemHeight = 40 + (health / maxHealth) * 60;
  const leafCount = Math.ceil((health / maxHealth) * 3);

  const petalColors = ["#FF6B8A", "#FF8FA3", "#FFB3C1", "#FF477E", "#F72585", "#E05780"];
  const angles = [0, 60, 120, 180, 240, 300];

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {/* pot */}
      <path d="M70 175 L80 200 L120 200 L130 175 Z" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
      <rect x="65" y="168" width="70" height="10" rx="3" fill="#CD853F" stroke="#8B4513" strokeWidth="1" />
      {/* soil */}
      <ellipse cx="100" cy="172" rx="30" ry="5" fill="#5D4037" />

      {/* stem */}
      <line x1="100" y1="170" x2="100" y2={170 - stemHeight}
        stroke={health === 0 ? "#8B7355" : "#2E7D32"} strokeWidth="4" strokeLinecap="round" />

      {/* leaves */}
      {leafCount >= 1 && (
        <ellipse cx="85" cy="145" rx="15" ry="6" fill={health === 0 ? "#8B7355" : "#4CAF50"}
          transform="rotate(-30, 85, 145)" opacity={0.9} />
      )}
      {leafCount >= 2 && (
        <ellipse cx="115" cy="130" rx="15" ry="6" fill={health === 0 ? "#8B7355" : "#66BB6A"}
          transform="rotate(25, 115, 130)" opacity={0.9} />
      )}
      {leafCount >= 3 && (
        <ellipse cx="88" cy="115" rx="12" ry="5" fill={health === 0 ? "#8B7355" : "#81C784"}
          transform="rotate(-20, 88, 115)" opacity={0.8} />
      )}

      {/* flower head */}
      {health > 0 ? (
        <g transform={`translate(100, ${170 - stemHeight})`}>
          {angles.slice(0, petalCount).map((angle, i) => (
            <ellipse key={i} cx={Math.cos((angle * Math.PI) / 180) * 16}
              cy={Math.sin((angle * Math.PI) / 180) * 16}
              rx="12" ry="8" fill={petalColors[i]}
              transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 16}, ${Math.sin((angle * Math.PI) / 180) * 16})`}
              opacity={0.85} />
          ))}
          <circle cx="0" cy="0" r="10" fill="#FFD54F" stroke="#FFA000" strokeWidth="1" />
          {won && (
            <>
              <circle cx="-3" cy="-2" r="1.5" fill="#5D4037" />
              <circle cx="3" cy="-2" r="1.5" fill="#5D4037" />
              <path d="M-4 3 Q0 7 4 3" stroke="#5D4037" strokeWidth="1.5" fill="none" />
            </>
          )}
        </g>
      ) : (
        <g transform={`translate(100, ${170 - stemHeight})`}>
          <circle cx="0" cy="0" r="10" fill="#8B7355" stroke="#6D4C41" strokeWidth="1" />
          <line x1="-3" y1="-2" x2="-1" y2="-2" stroke="#5D4037" strokeWidth="1.5" />
          <line x1="1" y1="-2" x2="3" y2="-2" stroke="#5D4037" strokeWidth="1.5" />
          <path d="M-3 3 Q0 1 3 3" stroke="#5D4037" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {/* sparkles if won */}
      {won && [
        [70, 60], [130, 55], [55, 90], [145, 85], [80, 40], [120, 45]
      ].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize="12" opacity={0.7}
          style={{ animation: `sparkle ${1 + i * 0.3}s ease-in-out infinite alternate` }}>✨</text>
      ))}
    </svg>
  );
}

function RocketDrawing({ wrongGuesses, maxWrong, won }) {
  const fuel = Math.max(0, maxWrong - wrongGuesses);
  const fuelPercent = fuel / maxWrong;
  const rocketY = 160 - fuelPercent * 100;

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {/* stars background */}
      {[
        [15, 20], [45, 50], [170, 30], [155, 80], [30, 140], [180, 150],
        [90, 15], [130, 170], [20, 90], [165, 120]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1} fill="#FFF9C4"
          opacity={0.4 + (i % 3) * 0.2} />
      ))}

      {/* planet */}
      <circle cx="160" cy="45" r="18" fill="#7E57C2" opacity="0.6" />
      <ellipse cx="160" cy="45" rx="28" ry="5" fill="none" stroke="#B39DDB" strokeWidth="2" opacity="0.5"
        transform="rotate(-15, 160, 45)" />

      {/* launch pad */}
      <rect x="60" y="175" width="80" height="6" rx="3" fill="#546E7A" />
      <rect x="75" y="170" width="10" height="8" rx="1" fill="#78909C" />
      <rect x="115" y="170" width="10" height="8" rx="1" fill="#78909C" />

      {/* rocket */}
      <g transform={`translate(100, ${rocketY})`}>
        {/* exhaust flame */}
        {fuelPercent > 0 && (
          <>
            <ellipse cx="0" cy="32" rx={5 + fuelPercent * 4} ry={8 + fuelPercent * 12}
              fill="#FF6F00" opacity="0.7" />
            <ellipse cx="0" cy="30" rx={3 + fuelPercent * 2} ry={5 + fuelPercent * 8}
              fill="#FFCA28" opacity="0.8" />
          </>
        )}

        {/* body */}
        <path d="M-12 25 L-14 -5 Q0 -35 14 -5 L12 25 Z" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1" />
        {/* nose cone */}
        <path d="M-8 -8 Q0 -32 8 -8" fill="#E53935" />
        {/* window */}
        <circle cx="0" cy="5" r="6" fill="#1E88E5" stroke="#BBDEFB" strokeWidth="1" />
        <circle cx="-2" cy="3" r="2" fill="#64B5F6" opacity="0.5" />
        {/* fins */}
        <path d="M-12 20 L-22 30 L-12 28 Z" fill="#E53935" />
        <path d="M12 20 L22 30 L12 28 Z" fill="#E53935" />

        {/* face */}
        {wrongGuesses >= maxWrong ? (
          <>
            <line x1="-3" y1="3" x2="-1" y2="5" stroke="white" strokeWidth="1.5" />
            <line x1="-1" y1="3" x2="-3" y2="5" stroke="white" strokeWidth="1.5" />
            <line x1="1" y1="3" x2="3" y2="5" stroke="white" strokeWidth="1.5" />
            <line x1="3" y1="3" x2="1" y2="5" stroke="white" strokeWidth="1.5" />
          </>
        ) : won ? (
          <text x="0" y="8" textAnchor="middle" fontSize="8" fill="white">:D</text>
        ) : null}
      </g>

      {/* fuel gauge */}
      <rect x="8" y="60" width="12" height="100" rx="6" fill="#263238" stroke="#455A64" strokeWidth="1" />
      <rect x="10" y={60 + 96 * (1 - fuelPercent)} width="8"
        height={96 * fuelPercent} rx="4"
        fill={fuelPercent > 0.5 ? "#4CAF50" : fuelPercent > 0.25 ? "#FFC107" : "#F44336"} />
      <text x="14" y="55" textAnchor="middle" fontSize="7" fill="#90A4AE" fontFamily="monospace">FUEL</text>

      {won && (
        <text x="100" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FFD54F">
          LIFTOFF! 🚀
        </text>
      )}
    </svg>
  );
}

// ─── Main App ───
export default function WordGuesser() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser] = useState(null);
  const [loginName, setLoginName] = useState("");
  const [loginAge, setLoginAge] = useState("");
  const [loginError, setLoginError] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // Game state
  const [gameMode, setGameMode] = useState(null); // "children" | "adult"
  const [difficulty, setDifficulty] = useState(null);
  const [visualStyle, setVisualStyle] = useState("classic"); // "classic" | "flower" | "rocket"
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
    (async () => {
      try {
        const res = await window.storage.get("currentUser");
        if (res?.value) {
          const u = JSON.parse(res.value);
          setUser(u);
          setScore(u.score || 0);
          setStreak(u.streak || 0);
        }
      } catch (e) {}
      try {
        const res = await window.storage.get("allUsers");
        if (res?.value) setAllUsers(JSON.parse(res.value));
      } catch (e) {}
      setScreen("login");
    })();
  }, []);

  const saveUser = useCallback(async (u) => {
    try {
      await window.storage.set("currentUser", JSON.stringify(u));
      setAllUsers(prev => {
        const idx = prev.findIndex(p => p.name.toLowerCase() === u.name.toLowerCase());
        const next = idx >= 0 ? [...prev.slice(0, idx), u, ...prev.slice(idx + 1)] : [...prev, u];
        window.storage.set("allUsers", JSON.stringify(next));
        return next;
      });
    } catch (e) {}
  }, []);

  const handleLogin = async () => {
    const name = loginName.trim();
    const age = parseInt(loginAge);
    if (!name) { setLoginError("Please enter your name"); return; }
    if (!loginAge || isNaN(age) || age < 3 || age > 120) { setLoginError("Please enter a valid age (3-120)"); return; }

    // Check for existing user
    let existing = null;
    try {
      const res = await window.storage.get(`user_${name.toLowerCase()}`);
      if (res?.value) existing = JSON.parse(res.value);
    } catch (e) {}

    const u = existing || { name, age, score: 0, streak: 0, gamesPlayed: 0, gamesWon: 0 };
    if (!existing) {
      u.age = age;
      await window.storage.set(`user_${name.toLowerCase()}`, JSON.stringify(u));
    }
    setUser(u);
    setScore(u.score || 0);
    setStreak(u.streak || 0);
    await saveUser(u);
    setScreen("menu");
  };

  const handleLogout = async () => {
    try { await window.storage.set("currentUser", JSON.stringify(null)); } catch (e) {}
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
      setVisualStyle("flower");
    } else {
      setVisualStyle("classic");
    }
    pickNewWord(mode, diff);
    setScreen("game");
  };

  const pickNewWord = (mode, diff) => {
    let bank;
    if (mode === "children") {
      if (diff === "easy") bank = WORD_BANKS.children_easy;
      else if (diff === "medium") bank = WORD_BANKS.children_medium;
      else bank = WORD_BANKS.children_hard;
    } else {
      bank = diff === "challenge" ? WORD_BANKS.adult_challenge : WORD_BANKS.adult_standard;
    }
    const word = bank[Math.floor(Math.random() * bank.length)];
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
        window.storage.set(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
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
        window.storage.set(`user_${user.name.toLowerCase()}`, JSON.stringify(updated));
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
    return currentWord.word.split("").map((letter, i) => {
      const revealed = guessedLetters.has(letter) || gameStatus === "lost";
      return (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: gameMode === "children" ? 42 : 36, height: gameMode === "children" ? 50 : 44,
          margin: "0 3px",
          borderBottom: `3px solid ${revealed ? (gameStatus === "lost" && !guessedLetters.has(letter) ? "#e74c3c" : "var(--accent)") : "var(--text-dim)"}`,
          fontSize: gameMode === "children" ? 26 : 22,
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
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎯</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", letterSpacing: -0.5 }}>
              Word Guesser
            </h1>
            <p style={{ color: "var(--text-dim)", margin: 0, fontSize: 13 }}>
              Sign in to track your score &amp; unlock age-appropriate games
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
                {childMode ? "🌈" : "⚡"} Hey, {user.name}!
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
                🌻 Pick Your Challenge
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { diff: "easy", label: "🐣 Starter", desc: "3-letter words · Perfect for beginners" },
                  { diff: "medium", label: "🐥 Explorer", desc: "4-5 letter words · With phonics sounds" },
                  { diff: "hard", label: "🦅 Champion", desc: "Big words · Tricky spellings" },
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
                  <div style={{ fontWeight: 800, fontSize: 16 }}>📝 Standard</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Interesting words · 8 lives</div>
                </button>
                <button onClick={() => startGame("adult", "challenge")}
                  style={{ ...btnStyle(false), textAlign: "left", padding: "16px 18px" }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>🔥 Challenge</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Obscure &amp; tricky · Only 6 lives</div>
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
      : visualStyle === "flower"
      ? <FlowerDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} won={gameStatus === "won"} />
      : <RocketDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} won={gameStatus === "won"} />;

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
              {maxWrong - wrongGuesses} {gameMode === "children" ? "🌸" : "❤️"} left
            </span>
          </div>

          {/* Visual toggle (adults only) */}
          {gameMode === "adult" && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
              {[
                { key: "classic", label: "Classic" },
                { key: "rocket", label: "Rocket" },
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
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: 16, gap: 2 }}>
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
                  ? (gameMode === "children" ? "🌟🎉🌟" : "✅")
                  : (gameMode === "children" ? "😢" : "💀")}
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
                  {gameMode === "children" ? "Play Again! 🎮" : "Next Word →"}
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
