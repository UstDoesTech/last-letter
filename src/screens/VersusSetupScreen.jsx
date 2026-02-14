import { useState } from "react";
import { containerStyle, cardStyleFor, btnStyle } from "../styles.js";

export default function VersusSetupScreen({
  theme,
  onStartGame,
  onBack,
  layout,
}) {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmedWord = word.trim().toUpperCase();
    const trimmedHint = hint.trim();
    const trimmedCategory = category.trim();

    if (!trimmedWord) {
      setError("Please enter a word");
      return;
    }

    if (trimmedWord.length < 3) {
      setError("Word must be at least 3 letters long");
      return;
    }

    if (!/^[A-Z]+$/.test(trimmedWord)) {
      setError("Word can only contain letters");
      return;
    }

    if (!trimmedHint) {
      setError("Please enter a hint");
      return;
    }

    if (!trimmedCategory) {
      setError("Please enter a category");
      return;
    }

    onStartGame({
      word: trimmedWord,
      hint: trimmedHint,
      category: trimmedCategory,
    });
  };

  return (
    <div style={containerStyle(theme, layout)}>
      <div style={{ ...cardStyleFor(layout), maxWidth: layout.cardMaxWidth - 60 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: layout.titleFontSize, fontWeight: 800 }}>
            🎮 Versus Mode Setup
          </h2>
          <button
            style={{
              ...btnStyle(false, layout),
              padding: "8px 14px",
              fontSize: layout.bodyFontSize - 1,
            }}
            onClick={onBack}
          >
            ← Back
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 16 }}>
            <strong>Player 1:</strong> Enter a word for Player 2 to guess.
            <br />
            <strong>Player 2:</strong> Don't peek! 👀
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              htmlFor="word"
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Word to Guess
            </label>
            <input
              id="word"
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setError("");
              }}
              placeholder="Enter the word..."
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: 16,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--bg)",
                color: "var(--text)",
                fontFamily: "inherit",
                minHeight: 44,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="hint"
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Hint
            </label>
            <input
              id="hint"
              type="text"
              value={hint}
              onChange={(e) => {
                setHint(e.target.value);
                setError("");
              }}
              placeholder="Give a helpful hint..."
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: 16,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--bg)",
                color: "var(--text)",
                fontFamily: "inherit",
                minHeight: 44,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setError("");
              }}
              placeholder="e.g., Animals, Food, Places..."
              style={{
                width: "100%",
                padding: "10px 14px",
                fontSize: 16,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--bg)",
                color: "var(--text)",
                fontFamily: "inherit",
                minHeight: 44,
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 8,
                color: "rgb(239, 68, 68)",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              ...btnStyle(true, layout),
              width: "100%",
              padding: "14px",
              fontSize: layout.btnFontSize,
              fontWeight: 800,
              marginTop: 8,
            }}
          >
            Start Game →
          </button>
        </div>
      </div>
    </div>
  );
}
