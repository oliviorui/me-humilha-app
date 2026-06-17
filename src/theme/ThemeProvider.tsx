import { createContext, ReactNode, useContext, useMemo } from "react";

import { AppPalette, AppThemeMode, darkPalette } from "./palette";

type ThemeContextValue = {
  mode: AppThemeMode;
  palette: AppPalette;
  isDark: true;
  isReady: true;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode: "dark",
      palette: darkPalette,
      isDark: true,
      isReady: true,
    };
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme precisa estar dentro de ThemeProvider.");
  }

  return context;
}
