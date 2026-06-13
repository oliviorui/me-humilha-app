import { useFonts } from "expo-font";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  PlayfairDisplay_400Regular_Italic,
} from "@expo-google-fonts/playfair-display";

type UseAppFontsResult = {
  fontsLoaded: boolean;
};

export function useAppFonts(): UseAppFontsResult {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlayfairDisplay_400Regular_Italic,
  });

  return {
    fontsLoaded,
  };
}
