import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AppPalette, AppThemeMode, palettes } from "./palette";

type ThemeContextValue = {
  mode: AppThemeMode;
  palette: AppPalette;
  isDark: boolean;
  isReady: boolean;
  toggleTheme: () => Promise<boolean>;
};

const STORAGE_KEY = "me_humilha_theme_mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<AppThemeMode>("dark");
  const [isReady, setIsReady] = useState(false);
  const modeRef = useRef<AppThemeMode>("dark");
  const themeWriteIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

        if (!isMounted) {
          return;
        }

        if (storedValue === "light" || storedValue === "dark") {
          modeRef.current = storedValue;
          setMode(storedValue);
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

  const toggleTheme = useCallback(async () => {
    const previousMode = modeRef.current;
    const nextMode: AppThemeMode = previousMode === "dark" ? "light" : "dark";
    const writeId = themeWriteIdRef.current + 1;

    themeWriteIdRef.current = writeId;
    modeRef.current = nextMode;
    setMode(nextMode);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, nextMode);
      return true;
    } catch {
      if (themeWriteIdRef.current === writeId) {
        modeRef.current = previousMode;
        setMode(previousMode);
      }

      return false;
    }
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      palette: palettes[mode],
      isDark: mode === "dark",
      isReady,
      toggleTheme,
    };
  }, [mode, isReady, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme precisa estar dentro de ThemeProvider.");
  }

  return context;
}
