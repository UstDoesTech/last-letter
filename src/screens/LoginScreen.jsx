import ScatteredAlphabetSVG from "../components/ScatteredAlphabetSVG.jsx";
import { containerStyle, cardStyleFor, btnStyle, inputStyle, getTheme } from "../styles.js";

export default function LoginScreen({
  loginName,
  setLoginName,
  loginAge,
  setLoginAge,
  loginError,
  setLoginError,
  onLogin,
  prefersDark,
  layout,
}) {
  // Login uses system theme preference
  const theme = getTheme(false, "adult", prefersDark);

  return (
    <div style={containerStyle(theme, layout)}>
      <div style={{ ...cardStyleFor(layout), maxWidth: layout.loginMaxWidth, marginTop: layout.loginMarginTop }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <ScatteredAlphabetSVG />
          <p
            style={{
              color: "var(--text-dim)",
              margin: "8px 0 0",
              fontSize: layout.bodyFontSize,
            }}
          >
            Guess the word before you lose your last letter!
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
                display: "block",
              }}
            >
              Your Name
            </label>
            <input
              style={inputStyle}
              placeholder="Enter your name..."
              value={loginName}
              onChange={(e) => {
                setLoginName(e.target.value);
                setLoginError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
                display: "block",
              }}
            >
              Your Age
            </label>
            <input
              style={inputStyle}
              type="number"
              placeholder="Age..."
              value={loginAge}
              onChange={(e) => {
                setLoginAge(e.target.value);
                setLoginError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              min="3"
              max="120"
            />
          </div>
          {loginError && (
            <div
              style={{ color: "#e74c3c", fontSize: 13, fontWeight: 600 }}
            >
              {loginError}
            </div>
          )}
          <button
            style={{ ...btnStyle(true, layout), width: "100%", marginTop: 4 }}
            onClick={onLogin}
          >
            Play →
          </button>
          <p
            style={{
              fontSize: 11,
              color: "var(--text-dim)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Returning players: enter the same name to load your score
          </p>
        </div>
      </div>
    </div>
  );
}
