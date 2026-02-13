// ─── Word display with dynamic tile scaling ───
export default function WordDisplay({
  currentWord,
  guessedLetters,
  gameStatus,
  gameMode,
}) {
  if (!currentWord) return null;

  const len = currentWord.word.length;
  const baseWidth = gameMode === "children" ? 42 : 36;
  const baseHeight = gameMode === "children" ? 50 : 44;
  const baseFontSize = gameMode === "children" ? 26 : 22;
  const maxContainerWidth = 480;
  const gap = 6;
  const totalNeeded = len * (baseWidth + gap);
  const scale =
    totalNeeded > maxContainerWidth ? maxContainerWidth / totalNeeded : 1;
  const tileWidth = Math.floor(baseWidth * scale);
  const tileHeight = Math.floor(baseHeight * scale);
  const tileFontSize = Math.floor(baseFontSize * scale);
  const tileMargin = Math.max(1, Math.floor(3 * scale));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 16,
        gap: 2,
      }}
    >
      {currentWord.word.split("").map((letter, i) => {
        const revealed = guessedLetters.has(letter) || gameStatus === "lost";
        return (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: tileWidth,
              height: tileHeight,
              margin: `0 ${tileMargin}px`,
              borderBottom: `${Math.max(2, Math.floor(3 * scale))}px solid ${
                revealed
                  ? gameStatus === "lost" && !guessedLetters.has(letter)
                    ? "#e74c3c"
                    : "var(--accent)"
                  : "var(--text-dim)"
              }`,
              fontSize: tileFontSize,
              fontWeight: 700,
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              color:
                gameStatus === "lost" && !guessedLetters.has(letter)
                  ? "#e74c3c"
                  : "var(--text)",
              transition: "all 0.3s ease",
            }}
          >
            {revealed ? letter : ""}
          </span>
        );
      })}
    </div>
  );
}
