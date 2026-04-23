export type AppThemeMode = "dark" | "light";

export type AppPalette = {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSoft: string;
  card: string;
  border: string;
  text: string;
  textSoft: string;
  textMuted: string;
  primary: string;
  primaryStrong: string;
  primaryText: string;
  accent: string;
  accent2: string;
  success: string;
  danger: string;
  shadow: string;
  overlay: string;
};

export const palettes: Record<AppThemeMode, AppPalette> = {
  dark: {
    background: "#09070F",
    backgroundSecondary: "#120A1F",
    surface: "rgba(20, 14, 34, 0.92)",
    surfaceSoft: "rgba(24, 17, 40, 0.82)",
    card: "rgba(16, 10, 28, 0.92)",
    border: "rgba(199, 153, 255, 0.18)",
    text: "#F6F1FF",
    textSoft: "rgba(246, 241, 255, 0.84)",
    textMuted: "rgba(246, 241, 255, 0.58)",
    primary: "#C857FF",
    primaryStrong: "#A833FF",
    primaryText: "#FFFFFF",
    accent: "#F6C945",
    accent2: "#8D37FF",
    success: "#44D39A",
    danger: "#FF6B7D",
    shadow: "rgba(0, 0, 0, 0.36)",
    overlay: "rgba(7, 5, 14, 0.76)",
  },
  light: {
    background: "#F3EDF9",
    backgroundSecondary: "#EDE3F9",
    surface: "rgba(241, 232, 251, 0.96)",
    surfaceSoft: "rgba(236, 226, 248, 0.96)",
    card: "rgba(239, 231, 249, 0.98)",
    border: "rgba(138, 91, 184, 0.20)",
    text: "#21143C",
    textSoft: "rgba(33, 20, 60, 0.82)",
    textMuted: "rgba(33, 20, 60, 0.56)",
    primary: "#B145E9",
    primaryStrong: "#932CDA",
    primaryText: "#FFFFFF",
    accent: "#F2C84B",
    accent2: "#8F42E4",
    success: "#28B37A",
    danger: "#D94C65",
    shadow: "rgba(70, 32, 110, 0.10)",
    overlay: "rgba(243, 237, 249, 0.68)",
  },
};
