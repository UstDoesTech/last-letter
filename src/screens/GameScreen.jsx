import { HangmanDrawing, LetterFadeDrawing, AlphabetBlocksDrawing } from "../components/drawings/index.js";
import Keyboard from "../components/Keyboard.jsx";
import WordDisplay from "../components/WordDisplay.jsx";
import { containerStyle, cardStyleFor, btnStyle } from "../styles.js";

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
  isVersusMode,
  onGuess,
  onShowHint,
  onNextWord,
  onMenu,
  calculateScore,
  layout,
}) {
  const visual =
    visualStyle === "classic" ? (
      <HangmanDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} layout={layout} />
    ) : visualStyle === "blocks" ? (
      <AlphabetBlocksDrawing
        wrongGuesses={wrongGuesses}
        maxWrong={maxWrong}
        won={gameStatus === "won"}
        layout={layout}
      />
    ) : (
      <LetterFadeDrawing wrongGuesses={wrongGuesses} maxWrong={maxWrong} layout={layout} />
    );

  return (
    <div style={containerStyle(theme, layout)}>
      {/* Top bar */}
      <div
        style={{
          width: "100%",
          maxWidth: layout.cardMaxWidth,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          padding: "0 2px",
        }}
      >
        <button
          style={{
            ...btnStyle(false, layout),
            padding: "8px 14px",
            fontSize: layout.bodyFontSize - 1,
          }}
          onClick={onMenu}
        >
          ← Menu
        </button>
        {!isVersusMode && (
          <div
            style={{
              display: "flex",
              gap: layout.topBarGap,
              fontSize: layout.bodyFontSize,
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
        )}
        {isVersusMode && (
          <div
            style={{
              fontSize: layout.bodyFontSize,
              fontWeight: 700,
              color: "var(--accent)",
            }}
          >
            🎮 Versus Mode
          </div>
        )}
      </div>

      <div style={{ ...cardStyleFor(layout), position: "relative" }}>
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
              fontSize: layout.device === "mobile" ? 10 : 12,
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
              fontSize: layout.bodyFontSize,
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
        {gameMode === "adult" && !isVersusMode && (
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
                  padding: layout.device === "mobile" ? "4px 12px" : "6px 18px",
                  borderRadius: 20,
                  fontSize: layout.device === "mobile" ? 11 : 12,
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
                  minHeight: layout.device === "mobile" ? 32 : 36,
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
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
                padding: layout.device === "mobile" ? "4px 12px" : "6px 18px",
                borderRadius: 20,
                fontSize: layout.device === "mobile" ? 11 : 12,
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
                minHeight: layout.device === "mobile" ? 32 : 36,
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
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
            margin: layout.device === "mobile" ? "4px 0 8px" : "8px 0 16px",
            maxHeight: layout.drawingMaxHeight,
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
          layout={layout}
        />

        {/* Hint */}
        <div
          style={{
            textAlign: "center",
            marginBottom: layout.hintMarginBottom,
            minHeight: 28,
          }}
        >
          {showHint ? (
            <div
              style={{
                fontSize: layout.bodyFontSize,
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
                fontSize: layout.bodyFontSize - 1,
                fontWeight: 600,
                border: "1px dashed var(--border)",
                background: "transparent",
                color: "var(--text-dim)",
                cursor: "pointer",
                minHeight: 36,
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
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
              padding: layout.overlayPadding,
              background:
                gameStatus === "won"
                  ? "var(--overlay-won)"
                  : "var(--overlay-lost)",
              borderRadius: 12,
              marginBottom: 16,
              border: `1px solid ${
                gameStatus === "won"
                  ? "var(--correct)"
                  : "var(--wrong)"
              }`,
            }}
          >
            <div style={{ fontSize: layout.overlayEmoji, marginBottom: 8 }}>
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
                fontSize: layout.overlayTitle,
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
            {gameStatus === "won" && !isVersusMode && (
              <div
                style={{
                  fontSize: layout.bodyFontSize + 1,
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
                  fontSize: layout.bodyFontSize + 1,
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
                flexWrap: "wrap",
              }}
            >
              {!isVersusMode && (
                <button style={btnStyle(true, layout)} onClick={onNextWord}>
                  {gameMode === "children"
                    ? "Play Again! 🔤"
                    : "Next Word →"}
                </button>
              )}
              <button style={btnStyle(isVersusMode ? true : false, layout)} onClick={onMenu}>
                {isVersusMode ? "Back to Menu" : "Menu"}
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
            layout={layout}
          />
        )}
      </div>
    </div>
  );
}
