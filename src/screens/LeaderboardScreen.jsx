import { containerStyle, cardStyle, btnStyle } from "../styles.js";

export default function LeaderboardScreen({
  theme,
  allUsers,
  currentUserName,
  onBack,
}) {
  const sorted = [...allUsers]
    .filter((u) => u.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  return (
    <div style={containerStyle(theme)}>
      <div style={{ ...cardStyle, maxWidth: 440 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
            🏆 Leaderboard
          </h2>
          <button style={btnStyle(false)} onClick={onBack}>
            ← Back
          </button>
        </div>
        {sorted.length === 0 ? (
          <p
            style={{
              color: "var(--text-dim)",
              textAlign: "center",
            }}
          >
            No scores yet. Be the first!
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {sorted.map((u, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: 10,
                  background:
                    u.name === currentUserName
                      ? "var(--accent-light)"
                      : "var(--bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color:
                        i < 3
                          ? "var(--accent)"
                          : "var(--text-dim)",
                      width: 28,
                    }}
                  >
                    {i === 0
                      ? "🥇"
                      : i === 1
                      ? "🥈"
                      : i === 2
                      ? "🥉"
                      : `#${i + 1}`}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                      {u.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-dim)",
                      }}
                    >
                      {u.gamesWon || 0}W / {u.gamesPlayed || 0}P
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: "var(--accent)",
                  }}
                >
                  {u.score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
