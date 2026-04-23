export type AppThemeMode = "dark" | "light";

export type AppPalette = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accent2: string;
  accent3: string;
  glow: string;
  progressBg: string;

  background: string;
  backgroundSecondary: string;
  surfaceSoft: string;
  card: string;
  textSoft: string;
  primary: string;
  primaryStrong: string;
  primaryText: string;
  success: string;
  danger: string;
  shadow: string;
  overlay: string;
};

export const palettes: Record<AppThemeMode, AppPalette> = {
  dark: {
    bg: "#0d0a12",
    surface: "#13101c",
    surface2: "#1a1228",
    border: "#2a1f3d",
    text: "#f0eaf8",
    textMuted: "#5a4d72",
    accent: "#f5c518",
    accent2: "#c054e0",
    accent3: "#8b2fc9",
    glow: "rgba(192,84,224,0.18)",
    progressBg: "#1e1530",

    background: "#0d0a12",
    backgroundSecondary: "#13101c",
    surfaceSoft: "#1a1228",
    card: "#13101c",
    textSoft: "#f0eaf8",
    primary: "#c054e0",
    primaryStrong: "#8b2fc9",
    primaryText: "#ffffff",
    success: "#44D39A",
    danger: "#FF6B7D",
    shadow: "rgba(0,0,0,0.36)",
    overlay: "rgba(13,10,18,0.72)",
  },
  light: {
    bg: "#f3eeff",
    surface: "#ebe3fa",
    surface2: "#ddd0f5",
    border: "#c9b8e8",
    text: "#1a0e2e",
    textMuted: "#8870b0",
    accent: "#f5c518",
    accent2: "#9b30c8",
    accent3: "#6b1fa0",
    glow: "rgba(155,48,200,0.10)",
    progressBg: "#d5c5ee",

    background: "#f3eeff",
    backgroundSecondary: "#ebe3fa",
    surfaceSoft: "#ddd0f5",
    card: "#ebe3fa",
    textSoft: "#1a0e2e",
    primary: "#9b30c8",
    primaryStrong: "#6b1fa0",
    primaryText: "#ffffff",
    success: "#28B37A",
    danger: "#D94C65",
    shadow: "rgba(70, 32, 110, 0.10)",
    overlay: "rgba(243,238,255,0.68)",
  },
};
