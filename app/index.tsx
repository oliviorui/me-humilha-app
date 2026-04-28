import { useEffect } from "react";
import { router } from "expo-router";

import { hasSeenOnboarding } from "../src/utils/appState";

export default function Index() {
  useEffect(() => {
    let isMounted = true;

    async function redirectUser() {
      const seenOnboarding = await hasSeenOnboarding();

      if (!isMounted) {
        return;
      }

      router.replace(seenOnboarding ? "/(tabs)" : "/onboarding");
    }

    void redirectUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
