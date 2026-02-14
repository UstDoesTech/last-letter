// ─── Theme definitions ───

// Children themes
export const childrenLight = {
  "--bg": "#FFF8E7",
  "--bg-card": "#FFFFFF",
  "--text": "#3E2723",
  "--text-dim": "#A1887F",
  "--accent": "#FF6F00",
  "--accent-light": "#FFE0B2",
  "--correct": "#43A047",
  "--wrong": "#E53935",
  "--key-bg": "#FFF3E0",
  "--key-used": "#EFEBE9",
  "--phonics-bg": "#E8F5E9",
  "--phonics-text": "#2E7D32",
  "--border": "#FFE0B2",
  "--btn-primary": "#FF6F00",
  "--btn-primary-hover": "#E65100",
  "--btn-secondary": "#FFF3E0",
  "--shadow": "0 4px 20px rgba(255, 111, 0, 0.08)",
  "--overlay-won": "#FFF8E1",
  "--overlay-lost": "#FFF0F0",
  "--drawing-primary": "#3E2723",
  "--drawing-secondary": "#5D4037",
  "--drawing-rope": "#8D6E63",
  "--grid-line": "#E0E0E0",
};

export const childrenDark = {
  "--bg": "#1A1A2E",
  "--bg-card": "#16213E",
  "--text": "#F0E6D3",
  "--text-dim": "#A89B8C",
  "--accent": "#FF8C42",
  "--accent-light": "#3D2814",
  "--correct": "#4CAF50",
  "--wrong": "#EF5350",
  "--key-bg": "#1E293B",
  "--key-used": "#16213E",
  "--phonics-bg": "#1B3A2D",
  "--phonics-text": "#66BB6A",
  "--border": "#2A3A5C",
  "--btn-primary": "#FF8C42",
  "--btn-primary-hover": "#E67E22",
  "--btn-secondary": "#1E293B",
  "--shadow": "0 4px 20px rgba(0, 0, 0, 0.3)",
  "--overlay-won": "#0D2818",
  "--overlay-lost": "#2D1117",
  "--drawing-primary": "#F0E6D3",
  "--drawing-secondary": "#C4A882",
  "--drawing-rope": "#A89B8C",
  "--grid-line": "#2A3A5C",
};

// Adult themes
export const adultLight = {
  "--bg": "#F6F8FA",
  "--bg-card": "#FFFFFF",
  "--text": "#24292F",
  "--text-dim": "#656D76",
  "--accent": "#0969DA",
  "--accent-light": "#DDF4FF",
  "--correct": "#1A7F37",
  "--wrong": "#CF222E",
  "--key-bg": "#F0F3F6",
  "--key-used": "#E8EAED",
  "--phonics-bg": "#DDF4FF",
  "--phonics-text": "#0969DA",
  "--border": "#D0D7DE",
  "--btn-primary": "#1F883D",
  "--btn-primary-hover": "#1A7F37",
  "--btn-secondary": "#F6F8FA",
  "--shadow": "0 4px 20px rgba(0, 0, 0, 0.06)",
  "--overlay-won": "#DAFBE1",
  "--overlay-lost": "#FFEBE9",
  "--drawing-primary": "#24292F",
  "--drawing-secondary": "#57606A",
  "--drawing-rope": "#8B949E",
  "--grid-line": "#D0D7DE",
};

export const adultDark = {
  "--bg": "#0D1117",
  "--bg-card": "#161B22",
  "--text": "#E6EDF3",
  "--text-dim": "#7D8590",
  "--accent": "#58A6FF",
  "--accent-light": "#1F3A5F",
  "--correct": "#3FB950",
  "--wrong": "#F85149",
  "--key-bg": "#21262D",
  "--key-used": "#161B22",
  "--phonics-bg": "#1F3A5F",
  "--phonics-text": "#58A6FF",
  "--border": "#30363D",
  "--btn-primary": "#238636",
  "--btn-primary-hover": "#2EA043",
  "--btn-secondary": "#21262D",
  "--shadow": "0 4px 20px rgba(0, 0, 0, 0.3)",
  "--overlay-won": "#0D2818",
  "--overlay-lost": "#2D1117",
  "--drawing-primary": "#E6EDF3",
  "--drawing-secondary": "#B1BAC4",
  "--drawing-rope": "#8B949E",
  "--grid-line": "#21262D",
};

// Backward-compatible aliases
export const childrenTheme = childrenLight;
export const adultTheme = adultDark;

export function getTheme(isChild, gameMode, prefersDark) {
  const isChildMode = isChild || gameMode === "children";
  if (isChildMode) {
    return prefersDark ? childrenDark : childrenLight;
  }
  return prefersDark ? adultDark : adultLight;
}

// ─── Shared styles ───

export function containerStyle(theme, layout) {
  return {
    ...theme,
    minHeight: "100vh",
    minHeight: "-webkit-fill-available",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: layout?.containerPadding || "12px",
    boxSizing: "border-box",
    WebkitOverflowScrolling: "touch",
  };
}

export function cardStyleFor(layout) {
  return {
    background: "var(--bg-card)",
    borderRadius: layout?.cardBorderRadius || 16,
    padding: layout?.cardPadding || "20px 16px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
    width: "100%",
    maxWidth: layout?.cardMaxWidth || 520,
    boxSizing: "border-box",
  };
}

export const cardStyle = {
  background: "var(--bg-card)",
  borderRadius: 16,
  padding: "20px 16px",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
  width: "100%",
  maxWidth: 520,
  boxSizing: "border-box",
};

export function btnStyle(primary = true, layout) {
  return {
    padding: layout?.btnPadding || "12px 20px",
    borderRadius: 10,
    fontSize: layout?.btnFontSize || 15,
    fontWeight: 700,
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: primary ? "var(--btn-primary)" : "var(--btn-secondary)",
    color: primary ? "white" : "var(--text)",
    boxShadow: primary ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
    border: primary ? "none" : "1px solid var(--border)",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
    minHeight: 44,
  };
}

export const inputStyle = {
  padding: "12px 16px",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 16,
  fontFamily: "'Courier Prime', 'Courier New', monospace",
  background: "var(--bg)",
  color: "var(--text)",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  minHeight: 44,
};
