// ─── Theme definitions ───

export const childrenTheme = {
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
};

export const adultTheme = {
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
};

export function getTheme(isChild, gameMode) {
  return (isChild || gameMode === "children") ? childrenTheme : adultTheme;
}

// ─── Shared styles ───

export function containerStyle(theme) {
  return {
    ...theme,
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    boxSizing: "border-box",
  };
}

export const cardStyle = {
  background: "var(--bg-card)",
  borderRadius: 16,
  padding: "28px 24px",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
  width: "100%",
  maxWidth: 520,
  boxSizing: "border-box",
};

export function btnStyle(primary = true) {
  return {
    padding: "12px 24px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Courier Prime', 'Courier New', monospace",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: primary ? "var(--btn-primary)" : "var(--btn-secondary)",
    color: primary ? "white" : "var(--text)",
    boxShadow: primary ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
    border: primary ? "none" : "1px solid var(--border)",
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
};
