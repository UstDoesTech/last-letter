import { HangmanDrawing, LetterFadeDrawing, AlphabetBlocksDrawing } from "../components/drawings/index.js";
import Keyboard from "../components/Keyboard.jsx";
import WordDisplay from "../components/WordDisplay.jsx";
import { containerStyle, cardStyle, btnStyle } from "../styles.js";

export default function GameScreen({
  theme,
  gameMode,
  difficulty,
  visualStyle,
  setVisualStyle,
  currentWord,
  guessedLetters,
  wrongGuesses,
  maxWrong,
  gameStatus,
  score,
  streak,
  showHint,
  hintUsed,
  usePhonicsClusters,
  setUsePhonicsClusters,
  onGuess,
  onShowHint,
  onNextWord,
  onMenu,
  calculateScore,
}) {
  const visual =
    visualStyle === "classic" ? (
      <HangmanDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} />
    ) : visualStyle === "blocks" ? (
      <AlphabetBlocksDrawing
        wrongGuesses={wrongGuesses}
        maxWrong={maxWrong}
        won={gameStatus === "won"}
      />
    ) : (
      <LetterFadeDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} />
    );

  return (
    <div style={containerStyle(theme)}>
      {/* Top bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <button
          style={{
            ...btnStyle(false),
            padding: "8px 14px",
            fontSize: 12,
          }}
          onClick={onMenu}
        >
          ← Menu
        </button>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <span>
            Score:{" "}
            <span style={{ color: "var(--accent)" }}>{score}</span>
          </span>
          <span>
            Streak:{" "}
            <span style={{ color: "var(--correct)" }}>{streak}</span>
          </span>
        </div>
      </div>

      <div style={{ ...cardStyle, position: "relative" }}>
        {/* Category & lives */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "var(--accent)",
              background: "var(--accent-light)",
              padding: "4px 10px",
              borderRadius: 20,
            }}
          >
            {currentWord.category}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color:
                wrongGuesses >= maxWrong - 2
                  ? "var(--wrong)"
                  : "var(--text-dim)",
            }}
          >
            {maxWrong - wrongGuesses}{" "}
            {gameMode === "children" ? "🔤" : "🔠"} left
          </span>
        </div>

        {/* Visual toggle (adults only) */}
        {gameMode === "adult" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {[
              { key: "classic", label: "Classic" },
              { key: "letterFade", label: "Letter Fade" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setVisualStyle(key)}
                style={{
                  padding: "4px 14px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  border: `1px solid ${
                    visualStyle === key
                      ? "var(--accent)"
                      : "var(--border)"
                  }`,
                  background:
                    visualStyle === key
                      ? "var(--accent-light)"
                      : "transparent",
                  color:
                    visualStyle === key
                      ? "var(--accent)"
                      : "var(--text-dim)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Children: Phonics toggle */}
        {gameMode === "children" && difficulty !== "easy" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <button
              onClick={() =>
                setUsePhonicsClusters(!usePhonicsClusters)
              }
              style={{
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                border: `1px solid ${
                  usePhonicsClusters
                    ? "var(--accent)"
                    : "var(--border)"
                }`,
                background: usePhonicsClusters
                  ? "var(--accent-light)"
                  : "transparent",
                color: usePhonicsClusters
                  ? "var(--accent)"
                  : "var(--text-dim)",
                cursor: "pointer",
              }}
            >
              {usePhonicsClusters ? "🔤 Phonics ON" : "🔤 Phonics OFF"}
            </button>
          </div>
        )}

        {/* Drawing */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "8px 0 16px",
          }}
        >
          {visual}
        </div>

        {/* Word display */}
        <WordDisplay
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          gameStatus={gameStatus}
          gameMode={gameMode}
        />

        {/* Hint */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            minHeight: 28,
          }}
        >
          {showHint ? (
            <div
              style={{
                fontSize: 13,
                color: "var(--text-dim)",
                fontStyle: "italic",
              }}
            >
              💡 {currentWord.hint}
            </div>
          ) : gameStatus === "playing" ? (
            <button
              onClick={onShowHint}
              style={{
                padding: "4px 16px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                border: "1px dashed var(--border)",
                background: "transparent",
                color: "var(--text-dim)",
                cursor: "pointer",
              }}
            >
              Need a hint? (-15 pts)
            </button>
          ) : null}
        </div>

        {/* Game over overlay */}
        {gameStatus !== "playing" && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              background:
                gameStatus === "won"
                  ? gameMode === "children"
                    ? "#FFF8E1"
                    : "#0D2818"
                  : gameMode === "children"
                  ? "#FFF0F0"
                  : "#2D1117",
              borderRadius: 12,
              marginBottom: 16,
              border: `1px solid ${
                gameStatus === "won"
                  ? "var(--correct)"
                  : "var(--wrong)"
              }`,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>
              {gameStatus === "won"
                ? gameMode === "children"
                  ? "🌟🎉🌟"
                  : "🔤✨"
                : gameMode === "children"
                ? "😢"
                : "🗝️"}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              {gameStatus === "won"
                ? gameMode === "children"
                  ? "Amazing Job!"
                  : "Well Done!"
                : "Game Over"}
            </div>
            {gameStatus === "won" && (
              <div
                style={{
                  fontSize: 14,
                  color: "var(--correct)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                +{calculateScore()} points!
              </div>
            )}
            {gameStatus === "lost" && (
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-dim)",
                  marginBottom: 4,
                }}
              >
                The word was:{" "}
                <b style={{ color: "var(--wrong)" }}>
                  {currentWord.word}
                </b>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                marginTop: 14,
              }}
            >
              <button style={btnStyle(true)} onClick={onNextWord}>
                {gameMode === "children"
                  ? "Play Again! 🔤"
                  : "Next Word →"}
              </button>
              <button style={btnStyle(false)} onClick={onMenu}>
                Menu
              </button>
            </div>
          </div>
        )}

        {/* Keyboard */}
        {gameStatus === "playing" && (
          <Keyboard
            gameMode={gameMode}
            currentWord={currentWord}
            guessedLetters={guessedLetters}
            gameStatus={gameStatus}
            usePhonicsClusters={usePhonicsClusters}
            onGuess={onGuess}
          />
        )}
      </div>
    </div>
  );
}
