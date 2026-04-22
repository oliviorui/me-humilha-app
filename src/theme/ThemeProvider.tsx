import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppPalette, AppThemeMode, palettes } from "./palette";

type ThemeContextValue = {
  mode: AppThemeMode;
  palette: AppPalette;
  isDark: boolean;
  isReady: boolean;
  toggleTheme: () => Promise<void>;
};

const STORAGE_KEY = "me_humilha_theme_mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<AppThemeMode>("dark");
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);

        if (!isMounted) {
          return;
        }

        if (storedTheme === "light" || storedTheme === "dark") {
          setMode(storedTheme);
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  async function toggleTheme() {
    const nextMode: AppThemeMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    await AsyncStorage.setItem(STORAGE_KEY, nextMode);
  }

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      palette: palettes[mode],
      isDark: mode === "dark",
      isReady,
      toggleTheme,
    };
  }, [isReady, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme precisa estar dentro de ThemeProvider.");
  }

  return context;
}
