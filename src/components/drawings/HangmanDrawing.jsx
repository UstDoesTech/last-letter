// ─── Classic Hangman gallows drawing ───
export default function HangmanDrawing({ wrongGuesses, maxWrong }) {
  const parts = [
    <line key="base" x1="20" y1="180" x2="100" y2="180" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="pole" x1="60" y1="180" x2="60" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="top" x1="60" y1="20" x2="140" y2="20" stroke="#2d1b0e" strokeWidth="4" strokeLinecap="round" />,
    <line key="rope" x1="140" y1="20" x2="140" y2="45" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />,
    <circle key="head" cx="140" cy="60" r="15" stroke="#4a3728" strokeWidth="3" fill="none" />,
    <line key="body" x1="140" y1="75" x2="140" y2="120" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="larm" x1="140" y1="85" x2="115" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="rarm" x1="140" y1="85" x2="165" y2="105" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="lleg" x1="140" y1="120" x2="115" y2="150" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
    <line key="rleg" x1="140" y1="120" x2="165" y2="150" stroke="#4a3728" strokeWidth="3" strokeLinecap="round" />,
  ];

  const partsPerWrong = parts.length / maxWrong;
  const showCount = Math.ceil(wrongGuesses * partsPerWrong);

  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
      {parts.slice(0, showCount)}
      {wrongGuesses >= maxWrong && (
        <>
          <line x1="133" y1="55" x2="137" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="137" y1="55" x2="133" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="143" y1="55" x2="147" y2="63" stroke="#c0392b" strokeWidth="2" />
          <line x1="147" y1="55" x2="143" y2="63" stroke="#c0392b" strokeWidth="2" />
          <path d="M133 68 Q140 74 147 68" stroke="#c0392b" strokeWidth="2" fill="none" />
        </>
      )}
      {wrongGuesses < maxWrong && showCount >= 5 && (
        <>
          <circle cx="135" cy="57" r="2" fill="#4a3728" />
          <circle cx="145" cy="57" r="2" fill="#4a3728" />
          {wrongGuesses >= maxWrong - 2 ? (
            <path d="M134 67 Q140 63 146 67" stroke="#4a3728" strokeWidth="1.5" fill="none" />
          ) : (
            <line x1="135" y1="66" x2="145" y2="66" stroke="#4a3728" strokeWidth="1.5" />
          )}
        </>
      )}
    </svg>
  );
}
