export type AppThemeMode = "dark" | "light";

export type AppPalette = {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceStrong: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textSoft: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  accent: string;
  accentSoft: string;
  overlay: string;
  danger: string;
  success: string;
  white: string;
  shadow: string;
};

export const palettes: Record<AppThemeMode, AppPalette> = {
  dark: {
    background: "#0A0911",
    backgroundAlt: "#120D1F",
    surface: "#181225",
    surfaceStrong: "#221936",
    surfaceMuted: "#2A1F40",
    border: "rgba(255,255,255,0.10)",
    text: "#FFFFFF",
    textSoft: "rgba(255,255,255,0.82)",
    textMuted: "rgba(255,255,255,0.60)",
    primary: "#F7C718",
    primaryText: "#17120B",
    accent: "#D94EF3",
    accentSoft: "#7B2CBF",
    overlay: "rgba(8,6,14,0.72)",
    danger: "#FF5F6D",
    success: "#3DDC97",
    white: "#FFFFFF",
    shadow: "rgba(0,0,0,0.35)",
  },
  light: {
    background: "#FFF8EC",
    backgroundAlt: "#F6ECFF",
    surface: "#FFFFFF",
    surfaceStrong: "#FFF2BF",
    surfaceMuted: "#F7E7FF",
    border: "rgba(25,20,35,0.10)",
    text: "#181225",
    textSoft: "rgba(24,18,37,0.82)",
    textMuted: "rgba(24,18,37,0.58)",
    primary: "#F7C718",
    primaryText: "#17120B",
    accent: "#C13BE3",
    accentSoft: "#8A38D2",
    overlay: "rgba(255,248,236,0.76)",
    danger: "#D64550",
    success: "#1FA971",
    white: "#FFFFFF",
    shadow: "rgba(48,26,70,0.12)",
  },
};
