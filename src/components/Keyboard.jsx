import { ALPHABET, PHONICS_CLUSTERS } from "../constants.js";

// ─── On-screen keyboard with optional phonics clusters ───
export default function Keyboard({
  gameMode,
  currentWord,
  guessedLetters,
  gameStatus,
  usePhonicsClusters,
  onGuess,
}) {
  const getKeyboardLetters = () => {
    if (gameMode === "children" && usePhonicsClusters) {
      const relevantPh = PHONICS_CLUSTERS.filter(
        (ph) => currentWord && currentWord.word.includes(ph)
      );
      const extraPh = PHONICS_CLUSTERS.filter(
        (ph) => !relevantPh.includes(ph)
      ).slice(0, Math.max(0, 4 - relevantPh.length));
      const phonics = [...relevantPh, ...extraPh];
      return { letters: ALPHABET, phonics };
    }
    return { letters: ALPHABET, phonics: [] };
  };

  const { letters, phonics } = getKeyboardLetters();

  const rows = [letters.slice(0, 9), letters.slice(9, 18), letters.slice(18)];

  const renderKey = (key, isPhonics = false) => {
    const isGuessed =
      key.length > 1
        ? key.split("").every((c) => guessedLetters.has(c))
        : guessedLetters.has(key);
    const isInWord =
      currentWord &&
      (key.length > 1
        ? currentWord.word.includes(key)
        : currentWord.word.includes(key));
    const wasWrong = isGuessed && !isInWord;
    const wasRight = isGuessed && isInWord;

    return (
      <button
        key={key}
        onClick={() => onGuess(key)}
        disabled={isGuessed || gameStatus !== "playing"}
        style={{
          width: isPhonics ? 52 : 38,
          height: 42,
          margin: 2,
          border: "none",
          borderRadius: 8,
          fontSize: isPhonics ? 13 : 15,
          fontWeight: 700,
          fontFamily: "'Courier Prime', 'Courier New', monospace",
          cursor:
            isGuessed || gameStatus !== "playing" ? "default" : "pointer",
          transition: "all 0.2s ease",
          background: wasRight
            ? "var(--correct)"
            : wasWrong
            ? "var(--wrong)"
            : isGuessed
            ? "var(--key-used)"
            : isPhonics
            ? "var(--phonics-bg)"
            : "var(--key-bg)",
          color:
            wasRight || wasWrong
              ? "white"
              : isGuessed
              ? "var(--text-dim)"
              : isPhonics
              ? "var(--phonics-text)"
              : "var(--text)",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {phonics.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-dim)",
              textAlign: "center",
              marginBottom: 4,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Phonics
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {phonics.map((p) => renderKey(p, true))}
          </div>
        </div>
      )}
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center" }}>
          {row.map((l) => renderKey(l))}
        </div>
      ))}
    </div>
  );
}
