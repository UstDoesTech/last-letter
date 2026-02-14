// ─── Word display with dynamic tile scaling ───
export default function WordDisplay({
  currentWord,
  guessedLetters,
  gameStatus,
  gameMode,
  layout,
}) {
  if (!currentWord) return null;

  const len = currentWord.word.length;
  const baseWidth = layout?.tileBaseWidth || (gameMode === "children" ? 38 : 32);
  const baseHeight = layout?.tileBaseHeight || (gameMode === "children" ? 44 : 38);
  const baseFontSize = layout?.tileFontSize || (gameMode === "children" ? 22 : 20);
  const gap = layout?.tileGap || 4;
  const containerWidth = Math.min((layout?.width || window.innerWidth) - 40, layout?.cardMaxWidth || 480);
  const totalNeeded = len * (baseWidth + gap);
  const scale =
    totalNeeded > containerWidth ? containerWidth / totalNeeded : 1;
  const tileWidth = Math.floor(baseWidth * scale);
  const tileHeight = Math.floor(baseHeight * scale);
  const tileFontSize = Math.floor(baseFontSize * scale);
  const tileMargin = Math.max(1, Math.floor(2 * scale));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
        marginBottom: layout?.device === "mobile" ? 10 : 16,
        gap: 1,
        width: "100%",
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
                    ? "var(--wrong)"
                    : "var(--accent)"
                  : "var(--text-dim)"
              }`,
              fontSize: tileFontSize,
              fontWeight: 700,
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              color:
                gameStatus === "lost" && !guessedLetters.has(letter)
                  ? "var(--wrong)"
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
