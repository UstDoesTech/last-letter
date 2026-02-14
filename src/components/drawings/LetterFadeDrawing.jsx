// ─── Letter "Z" that progressively erases/dissolves ───
export default function LetterFadeDrawing({ wrongGuesses, maxWrong, layout }) {
  const remaining = maxWrong - wrongGuesses;

  const cols = 5;
  const rows = 7;
  const tiles = [];
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

  const tilesToShow = Math.ceil((remaining / maxWrong) * tiles.length);
  const baseColors = ["var(--accent)", "var(--accent)", "var(--accent)", "var(--accent)", "var(--accent)"];

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: layout?.drawingMaxWidth || 180, maxHeight: layout?.drawingMaxHeight || "28vh", height: "auto" }}>
      {/* Subtle grid background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={20 + i * 22} x2="180" y2={20 + i * 22} stroke="var(--grid-line)" strokeWidth="0.5" opacity="0.5" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={30 + i * 30} y1="10" x2={30 + i * 30} y2="190" stroke="var(--grid-line)" strokeWidth="0.5" opacity="0.5" />
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
            <rect x={x} y={y} width="22" height="18" rx="3" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
          </g>
        );
      })}

      {/* Status text */}
      {wrongGuesses >= maxWrong && (
        <text x="100" y="195" textAnchor="middle" fontSize="11" fill="var(--wrong)" fontWeight="700" fontFamily="monospace">
          LETTERS LOST
        </text>
      )}
      {wrongGuesses === 0 && (
        <text x="100" y="195" textAnchor="middle" fontSize="10" fill="var(--text-dim)" fontFamily="monospace">
          Don't lose your letters!
        </text>
      )}
    </svg>
  );
}
