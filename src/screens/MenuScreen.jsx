import { containerStyle, cardStyle, btnStyle } from "../styles.js";

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
}) {
  const childMode = isChild;

  return (
    <div style={containerStyle(theme)}>
      <div style={{ ...cardStyle, maxWidth: 440 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
              {childMode ? "📚" : "🔠"} Hey, {user.name}!
            </h2>
            <p
              style={{
                color: "var(--text-dim)",
                margin: "4px 0 0",
                fontSize: 13,
              }}
            >
              Score: <b style={{ color: "var(--accent)" }}>{score}</b> ·
              Streak: <b>{streak}</b>
            </p>
          </div>
          <button
            style={{
              ...btnStyle(false),
              padding: "8px 14px",
              fontSize: 12,
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
                    ...btnStyle(false),
                    textAlign: "left",
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 16 }}>
                    {label}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "var(--text-dim)" }}
                  >
                    {desc}
                  </span>
                </button>
              ))}
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
                  ...btnStyle(false),
                  textAlign: "left",
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 16 }}>
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
                  ...btnStyle(false),
                  textAlign: "left",
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 16 }}>
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
                  ...btnStyle(false),
                  textAlign: "left",
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 16 }}>
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
            ...btnStyle(false),
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
