import { useState, useEffect } from "react";

// ─── Responsive device detection hook ───
// Returns device class and pre-computed layout values for mobile / tablet / laptop+
export function useDevice() {
  const getDevice = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 600) return "mobile";
    if (w < 1024) return "tablet";
    return "laptop";
  };

  const [device, setDevice] = useState(getDevice);
  const [width, setWidth] = useState(() => window.innerWidth);
  const [height, setHeight] = useState(() => window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setDevice(getDevice());
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pre-computed responsive values
  const layout = getLayout(device, width, height);

  return { device, width, height, ...layout };
}

function getLayout(device, width, height) {
  switch (device) {
    case "mobile":
      return {
        containerPadding: "10px",
        cardPadding: "16px 12px",
        cardMaxWidth: 520,
        cardBorderRadius: 14,
        drawingMaxWidth: 160,
        drawingMaxHeight: "26vh",
        keyHeight: 42,
        keyMaxWidth: 40,
        keyFontSize: 13,
        keyGap: 2,
        phonicsKeyWidth: 48,
        phFontSize: 11,
        kbMaxWidth: "100%",
        titleFontSize: 20,
        bodyFontSize: 13,
        btnPadding: "10px 16px",
        btnFontSize: 14,
        tileBaseWidth: 32,
        tileBaseHeight: 36,
        tileFontSize: 18,
        tileGap: 3,
        loginMarginTop: "max(2vh, 12px)",
        loginMaxWidth: 400,
        topBarGap: 12,
        hintMarginBottom: 8,
        overlayPadding: "16px",
        overlayEmoji: 28,
        overlayTitle: 18,
      };
    case "tablet":
      return {
        containerPadding: "20px",
        cardPadding: "28px 24px",
        cardMaxWidth: 560,
        cardBorderRadius: 18,
        drawingMaxWidth: 220,
        drawingMaxHeight: "32vh",
        keyHeight: 48,
        keyMaxWidth: 46,
        keyFontSize: 15,
        keyGap: 3,
        phonicsKeyWidth: 58,
        phFontSize: 13,
        kbMaxWidth: 460,
        titleFontSize: 24,
        bodyFontSize: 14,
        btnPadding: "12px 22px",
        btnFontSize: 15,
        tileBaseWidth: 40,
        tileBaseHeight: 48,
        tileFontSize: 24,
        tileGap: 5,
        loginMarginTop: "6vh",
        loginMaxWidth: 440,
        topBarGap: 16,
        hintMarginBottom: 14,
        overlayPadding: "24px",
        overlayEmoji: 36,
        overlayTitle: 22,
      };
    default: // laptop
      return {
        containerPadding: "24px",
        cardPadding: "32px 32px",
        cardMaxWidth: 600,
        cardBorderRadius: 20,
        drawingMaxWidth: 260,
        drawingMaxHeight: "36vh",
        keyHeight: 50,
        keyMaxWidth: 48,
        keyFontSize: 16,
        keyGap: 4,
        phonicsKeyWidth: 64,
        phFontSize: 14,
        kbMaxWidth: 500,
        titleFontSize: 26,
        bodyFontSize: 15,
        btnPadding: "14px 28px",
        btnFontSize: 16,
        tileBaseWidth: 44,
        tileBaseHeight: 52,
        tileFontSize: 26,
        tileGap: 6,
        loginMarginTop: "10vh",
        loginMaxWidth: 460,
        topBarGap: 20,
        hintMarginBottom: 16,
        overlayPadding: "28px",
        overlayEmoji: 40,
        overlayTitle: 24,
      };
  }
}
