import { ALPHABET, PHONICS_CLUSTERS } from "../constants.js";

// ─── On-screen keyboard with optional phonics clusters ───
export default function Keyboard({
  gameMode,
  currentWord,
  guessedLetters,
  gameStatus,
  usePhonicsClusters,
  onGuess,
  layout,
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
          flex: isPhonics ? "0 0 auto" : "1 1 0",
          minWidth: isPhonics ? layout.phonicsKeyWidth : 0,
          maxWidth: isPhonics ? layout.phonicsKeyWidth + 12 : layout.keyMaxWidth,
          height: layout.keyHeight,
          margin: `${layout.keyGap}px ${Math.max(1, layout.keyGap - 1)}px`,
          padding: 0,
          border: "none",
          borderRadius: layout.device === "mobile" ? 8 : 10,
          fontSize: isPhonics ? layout.phFontSize : layout.keyFontSize,
          fontWeight: 700,
          fontFamily: "'Courier Prime', 'Courier New', monospace",
          cursor:
            isGuessed || gameStatus !== "playing" ? "default" : "pointer",
          transition: "all 0.15s ease",
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
          boxShadow: isGuessed ? "none" : "0 1px 3px rgba(0,0,0,0.12)",
          transform: isGuessed ? "scale(0.95)" : "scale(1)",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          userSelect: "none",
          WebkitUserSelect: "none",
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
        alignItems: "stretch",
        gap: layout.keyGap,
        width: "100%",
        maxWidth: layout.kbMaxWidth,
        margin: "0 auto",
      }}
    >
      {phonics.length > 0 && (
        <div style={{ marginBottom: 6 }}>
          <div
            style={{
              fontSize: layout.device === "mobile" ? 10 : 11,
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
              gap: layout.keyGap + 1,
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
