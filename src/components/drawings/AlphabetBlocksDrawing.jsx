// ─── Children: Alphabet blocks that topple over ───
export default function AlphabetBlocksDrawing({ wrongGuesses, maxWrong, won }) {
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
