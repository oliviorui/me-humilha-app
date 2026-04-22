import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "me_humilha_onboarding_seen";

export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "true";
  } catch {
    return false;
  }
}

export async function setOnboardingSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch {
    throw new Error("Não foi possível guardar o estado do onboarding.");
  }
}
