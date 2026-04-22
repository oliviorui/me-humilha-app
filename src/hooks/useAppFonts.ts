import { useFonts } from "expo-font";
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";

type UseAppFontsResult = {
  fontsLoaded: boolean;
};

export function useAppFonts(): UseAppFontsResult {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });

  return {
    fontsLoaded,
  };
}
