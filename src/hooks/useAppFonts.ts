import { useFonts } from "expo-font";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import {
  PlayfairDisplay_400Regular_Italic,
} from "@expo-google-fonts/playfair-display";

type UseAppFontsResult = {
  fontsLoaded: boolean;
};

export function useAppFonts(): UseAppFontsResult {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    PlayfairDisplay_400Regular_Italic,
  });

  return {
    fontsLoaded,
  };
}
