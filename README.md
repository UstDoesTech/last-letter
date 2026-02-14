**Preamble:** This game was built (vibed) for my children so that they can play a version of hangman by themselves, with each other, their friends, and with me and their mum. While it is built for them, it's open for everyone to enjoy at [last-letter.app](https://last-letter.app)

# Last Letter

A word-guessing game built with React and Vite. Guess the word before you run out of letters — with separate modes for children and adults, system-aware theming, and responsive layouts that adapt to any device.

## Features

- **Two audiences** — Children mode (ages < 13) serves age-appropriate words with phonics cluster support; Adult mode offers standard and challenge difficulties
- **Versus mode** — Local two-player: one player enters a word, the other guesses
- **Light & dark themes** — Automatically follows the system `prefers-color-scheme` preference, with four theme variants (children light/dark, adult light/dark)
- **Device-adaptive layout** — Responsive hook (`useDevice`) detects mobile (< 600 px), tablet (600–1024 px), and laptop (≥ 1024 px) and scales all UI dimensions accordingly
- **Three visual styles** — Classic hangman gallows, alphabet blocks (children), and letter-fade drawing
- **Phonics keyboard** — Optional phonics cluster keys (SH, CH, TH, etc.) for children's mode
- **Scoring & streaks** — Persistent per-user scores and win streaks stored in `localStorage`
- **Leaderboard** — Top 15 players ranked by score

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 (JSX) |
| Build | Vite 6 |
| Styling | CSS-in-JS (inline styles + CSS custom properties) |
| Storage | `localStorage` |

No backend — everything runs client-side.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

### Install & Run

```bash
npm install
npm run dev
```

Vite will start a dev server (default `http://localhost:5173`).

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

Output goes to the `dist/` folder.

## Project Structure

```
├── index.html                    Entry HTML (mobile meta tags, safe-area insets)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  React root mount
    ├── game.jsx                  App component, routing, game state, dark-mode hook
    ├── styles.js                 Theme definitions & responsive style helpers
    ├── constants.js              Alphabet & phonics clusters
    ├── words.js                  Full word list with hints & categories
    ├── useDevice.js              Responsive device-detection hook (mobile/tablet/laptop)
    ├── components/
    │   ├── Keyboard.jsx          On-screen letter keyboard + phonics clusters
    │   ├── WordDisplay.jsx       Word tiles (blanks / revealed letters)
    │   ├── ScatteredAlphabetSVG.jsx  Decorative login-screen graphic
    │   └── drawings/
    │       ├── index.js          Drawing component map
    │       ├── HangmanDrawing.jsx      Classic gallows SVG
    │       ├── AlphabetBlocksDrawing.jsx  Toppling blocks SVG (children)
    │       └── LetterFadeDrawing.jsx     Letter dissolve SVG
    └── screens/
        ├── LoginScreen.jsx       Name & age entry
        ├── MenuScreen.jsx        Mode selection
        ├── GameScreen.jsx        Main gameplay
        ├── LeaderboardScreen.jsx Score rankings
        └── VersusSetupScreen.jsx Word entry for versus mode
```

## Game Modes

### Children (age < 13)

| Difficulty | Words | Lives |
|-----------|-------|-------|
| Starter (easy) | 3-letter words | 8 |
| Explorer (medium) | 4–5 letter words with phonics | 8 |
| Champion (hard) | Longer words, tricky spellings | 8 |

### Adult (age ≥ 13)

| Difficulty | Words | Lives |
|-----------|-------|-------|
| Standard | Interesting vocabulary | 8 |
| Challenge | Obscure & difficult | 6 |

### Versus

Either audience can start a versus game — Player 1 enters a custom word, hint, and category for Player 2 to guess.

## Responsive Breakpoints

| Device | Width | Example adjustments |
|--------|-------|-------------------|
| Mobile | < 600 px | Compact cards, smaller tiles & keys, 26 vh drawings |
| Tablet | 600–1024 px | Medium spacing, 32 vh drawings |
| Laptop+ | ≥ 1024 px | Full-size card, large tiles & keys, 36 vh drawings |

All sizing flows from the `useDevice` hook through a `layout` prop passed to every component.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as long as the original copyright notice and license are included (citation).
