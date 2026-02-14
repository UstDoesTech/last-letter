import { containerStyle, cardStyleFor, btnStyle } from "../styles.js";

export default function MenuScreen({
  theme,
  user,
  isChild,
  score,
  streak,
  onStartGame,
  onLogout,
  onLeaderboard,
  onVersusMode,
  layout,
}) {
  const childMode = isChild;

  return (
    <div style={containerStyle(theme, layout)}>
      <div style={{ ...cardStyleFor(layout), maxWidth: layout.cardMaxWidth - 60 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: layout.titleFontSize - 2, fontWeight: 800 }}>
              {childMode ? "📚" : "🔠"} Hey, {user.name}!
            </h2>
            <p
              style={{
                color: "var(--text-dim)",
                margin: "4px 0 0",
                fontSize: layout.bodyFontSize,
              }}
            >
              Score: <b style={{ color: "var(--accent)" }}>{score}</b> ·
              Streak: <b>{streak}</b>
            </p>
          </div>
          <button
            style={{
              ...btnStyle(false, layout),
              padding: "8px 14px",
              fontSize: layout.bodyFontSize - 1,
            }}
            onClick={onLogout}
          >
            Sign Out
          </button>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            margin: "20px 0",
          }}
        />

        {childMode ? (
          <>
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              🔤 Pick Your Challenge
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                {
                  diff: "easy",
                  label: "✏️ Starter",
                  desc: "3-letter words · Perfect for beginners",
                },
                {
                  diff: "medium",
                  label: "📝 Explorer",
                  desc: "4-5 letter words · With phonics sounds",
                },
                {
                  diff: "hard",
                  label: "📖 Champion",
                  desc: "Big words · Tricky spellings",
                },
              ].map(({ diff, label, desc }) => (
                <button
                  key={diff}
                  onClick={() => onStartGame("children", diff)}
                  style={{
                    ...btnStyle(false, layout),
                    textAlign: "left",
                    padding: layout.device === "mobile" ? "14px 14px" : "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: layout.btnFontSize }}>
                    {label}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "var(--text-dim)" }}
                  >
                    {desc}
                  </span>
                </button>
              ))}
              <button
                onClick={onVersusMode}
                style={{
                  ...btnStyle(false, layout),
                  textAlign: "left",
                  padding: layout.device === "mobile" ? "14px 14px" : "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span style={{ fontWeight: 800, fontSize: layout.btnFontSize }}>
                  🎮 Versus Mode
                </span>
                <span
                  style={{ fontSize: 12, color: "var(--text-dim)" }}
                >
                  Play with a friend · Local play
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h3
              style={{
                margin: "0 0 14px",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Choose Your Mode
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <button
                onClick={() => onStartGame("adult", "standard")}
                style={{
                  ...btnStyle(false, layout),
                  textAlign: "left",
                  padding: layout.device === "mobile" ? "14px 14px" : "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: layout.btnFontSize }}>
                  🔠 Standard
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--text-dim)" }}
                >
                  Interesting words · 8 letters to spare
                </div>
              </button>
              <button
                onClick={() => onStartGame("adult", "challenge")}
                style={{
                  ...btnStyle(false, layout),
                  textAlign: "left",
                  padding: layout.device === "mobile" ? "14px 14px" : "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: layout.btnFontSize }}>
                  🔥 Challenge
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--text-dim)" }}
                >
                  Obscure &amp; tricky · Only 6 letters
                </div>
              </button>
              <button
                onClick={onVersusMode}
                style={{
                  ...btnStyle(false, layout),
                  textAlign: "left",
                  padding: layout.device === "mobile" ? "14px 14px" : "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: layout.btnFontSize }}>
                  🎮 Versus Mode
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--text-dim)" }}
                >
                  Player vs Player · Local play
                </div>
              </button>
            </div>
          </>
        )}

        <button
          onClick={onLeaderboard}
          style={{
            ...btnStyle(false, layout),
            width: "100%",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );
}
