import { useEffect, useState } from "react";
import { router } from "expo-router";

import LaunchScreen from "../src/screens/LaunchScreen";
import { hasSeenOnboarding } from "../src/utils/appState";

export default function Index() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const seen = await hasSeenOnboarding();

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1600);
      });

      if (!isMounted) {
        return;
      }

      if (seen) {
        router.replace("/home");
      } else {
        router.replace("/onboarding");
      }

      setIsReady(true);
    }

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return <LaunchScreen />;
  }

  return null;
}
