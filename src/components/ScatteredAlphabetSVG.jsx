// ─── Home page: Scattered alphabet letters tumbling from a tipped bag ───
export default function ScatteredAlphabetSVG() {
  const scattered = [
    // Top-left cluster — small, faded, tilted
    { letter: "Q", x: 18,  y: 28,  size: 14, rotate: -35, opacity: 0.18 },
    { letter: "W", x: 52,  y: 18,  size: 11, rotate: 22,  opacity: 0.14 },
    { letter: "M", x: 38,  y: 52,  size: 12, rotate: -12, opacity: 0.22 },
    { letter: "X", x: 8,   y: 65,  size: 10, rotate: 45,  opacity: 0.12 },
    // Top-right cluster
    { letter: "R", x: 340, y: 22,  size: 13, rotate: 18,  opacity: 0.16 },
    { letter: "P", x: 370, y: 48,  size: 11, rotate: -28, opacity: 0.20 },
    { letter: "K", x: 310, y: 38,  size: 10, rotate: 40,  opacity: 0.13 },
    { letter: "J", x: 355, y: 72,  size: 9,  rotate: -8,  opacity: 0.15 },
    // Mid-left — slightly larger, varied angles
    { letter: "F", x: 22,  y: 110, size: 16, rotate: -20, opacity: 0.25 },
    { letter: "G", x: 55,  y: 90,  size: 13, rotate: 30,  opacity: 0.28 },
    { letter: "D", x: 12,  y: 150, size: 14, rotate: 15,  opacity: 0.22 },
    { letter: "B", x: 65,  y: 140, size: 11, rotate: -42, opacity: 0.19 },
    { letter: "Y", x: 42,  y: 175, size: 12, rotate: 8,   opacity: 0.16 },
    // Mid-right
    { letter: "N", x: 340, y: 105, size: 15, rotate: 25,  opacity: 0.24 },
    { letter: "V", x: 365, y: 135, size: 12, rotate: -18, opacity: 0.20 },
    { letter: "H", x: 320, y: 155, size: 14, rotate: -30, opacity: 0.26 },
    { letter: "U", x: 355, y: 170, size: 10, rotate: 35,  opacity: 0.15 },
    // Inner ring around centre — medium, somewhat visible
    { letter: "A", x: 110, y: 55,  size: 19, rotate: -15, opacity: 0.35 },
    { letter: "S", x: 145, y: 40,  size: 16, rotate: 12,  opacity: 0.30 },
    { letter: "E", x: 240, y: 50,  size: 18, rotate: -8,  opacity: 0.33 },
    { letter: "O", x: 275, y: 68,  size: 15, rotate: 20,  opacity: 0.28 },
    { letter: "I", x: 100, y: 100, size: 17, rotate: -25, opacity: 0.32 },
    { letter: "C", x: 280, y: 110, size: 16, rotate: 15,  opacity: 0.30 },
    { letter: "T", x: 120, y: 165, size: 18, rotate: 10,  opacity: 0.34 },
    { letter: "Z", x: 265, y: 170, size: 17, rotate: -22, opacity: 0.29 },
    // Close ring — larger, brighter
    { letter: "E", x: 150, y: 85,  size: 22, rotate: -6,  opacity: 0.45 },
    { letter: "T", x: 235, y: 88,  size: 20, rotate: 10,  opacity: 0.42 },
    { letter: "R", x: 135, y: 140, size: 21, rotate: 14,  opacity: 0.44 },
    { letter: "S", x: 250, y: 145, size: 19, rotate: -10, opacity: 0.40 },
    { letter: "A", x: 160, y: 170, size: 20, rotate: -4,  opacity: 0.38 },
    { letter: "N", x: 225, y: 175, size: 18, rotate: 8,   opacity: 0.36 },
    // Bottom scatter — falling away
    { letter: "O", x: 60,  y: 210, size: 13, rotate: 32,  opacity: 0.18 },
    { letter: "W", x: 100, y: 220, size: 11, rotate: -20, opacity: 0.14 },
    { letter: "P", x: 290, y: 215, size: 12, rotate: 28,  opacity: 0.16 },
    { letter: "I", x: 330, y: 205, size: 10, rotate: -15, opacity: 0.12 },
    { letter: "G", x: 165, y: 215, size: 11, rotate: 18,  opacity: 0.13 },
    { letter: "D", x: 220, y: 220, size: 10, rotate: -25, opacity: 0.11 },
    // Very faint far edges
    { letter: "C", x: 2,   y: 200, size: 9,  rotate: 50,  opacity: 0.08 },
    { letter: "V", x: 378, y: 210, size: 9,  rotate: -40, opacity: 0.08 },
    { letter: "H", x: 85,  y: 8,   size: 9,  rotate: 30,  opacity: 0.09 },
    { letter: "B", x: 290, y: 12,  size: 9,  rotate: -35, opacity: 0.09 },
  ];

  return (
    <svg viewBox="0 0 390 240" style={{ width: "100%", maxWidth: 360, height: "auto", display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id="centreGlow">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Scattered letters */}
      {scattered.map((s, i) => (
        <text
          key={i}
          x={s.x}
          y={s.y}
          fontSize={s.size}
          fontWeight={s.size > 16 ? "800" : "700"}
          fontFamily="'Courier Prime', monospace"
          fill="var(--text)"
          opacity={s.opacity}
          transform={`rotate(${s.rotate}, ${s.x}, ${s.y})`}
          style={{ userSelect: "none" }}
        >
          {s.letter}
        </text>
      ))}

      {/* Centre glow */}
      <circle cx="195" cy="125" r="50" fill="url(#centreGlow)" />

      {/* The "Last" letter — big, bright, upright */}
      <text
        x="195"
        y="138"
        fontSize="56"
        fontWeight="900"
        fontFamily="'Courier Prime', monospace"
        fill="var(--accent)"
        textAnchor="middle"
        opacity="1"
        style={{ userSelect: "none", filter: "drop-shadow(0 0 8px var(--accent))" }}
      >
        L
      </text>

      {/* Title under the L */}
      <text
        x="195"
        y="162"
        fontSize="16"
        fontWeight="900"
        fontFamily="'Courier Prime', monospace"
        fill="var(--accent)"
        textAnchor="middle"
        opacity="0.9"
        letterSpacing="5"
        style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
      >
        LAST LETTER
      </text>
    </svg>
  );
}
