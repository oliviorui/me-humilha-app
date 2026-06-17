import { InteractionManager, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

import AppHeader from "../../src/components/AppHeader";
import ProgressBar from "../../src/components/ProgressBar";
import QuotePanel from "../../src/components/QuotePanel";
import GenerateButton from "../../src/components/GenerateButton";
import ScreenBackground from "../../src/components/ScreenBackground";
import SharePoster from "../../src/components/SharePoster";

import { useAppFonts } from "../../src/hooks/useAppFonts";
import { useAppTheme } from "../../src/theme/ThemeProvider";
import { getYearProgress } from "../../src/utils/getYearProgress";
import { saveFavorite } from "../../src/utils/favorites";
import {
  getRandomItem,
  type RandomItemResult,
} from "../../src/utils/getRandomItem";
import { images, type AppImage } from "../../src/data/images";
import { quotes, type Quote } from "../../src/data/quotes";

type ToastKind = "success" | "warning" | "error";

type ToastState = {
  message: string;
  kind: ToastKind;
};

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export default function HomeTab() {
  const { fontsLoaded } = useAppFonts();
  const { palette } = useAppTheme();
  const shareCardRef = useRef<ViewShot | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );
  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shouldRenderSharePoster, setShouldRenderSharePoster] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const yearProgress = getYearProgress();
  const actionsDisabled = isAnimating || isSaving || isSharing;

  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      if (generateTimerRef.current) {
        clearTimeout(generateTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback(
    (message: string, kind: ToastKind = "success") => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      setToast({ message, kind });

      toastTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setToast(null);
        }
      }, 2200);
    },
    []
  );

  const handleGenerate = useCallback(() => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setIsLiked(false);

    generateTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }

      setQuoteState((currentQuoteState) =>
        getRandomItem(quotes, currentQuoteState.index)
      );
      setImageState((currentImageState) =>
        getRandomItem(images, currentImageState.index)
      );
      setIsAnimating(false);
    }, 750);
  }, [isAnimating]);

  const handleSave = useCallback(async () => {
    if (isAnimating || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveFavorite({
        id: `${Date.now()}-${quoteState.index}-${imageState.index}`,
        quote: quoteState.item,
        image: imageState.item,
        createdAt: Date.now(),
      });

      if (!result.saved) {
        showToast("Essa lapada já está guardada.", "warning");
        return;
      }

      showToast("Essa doeu. Guardada.", "success");
    } catch {
      showToast("Não foi possível guardar agora.", "error");
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false);
      }
    }
  }, [imageState.index, imageState.item, isAnimating, isSaving, quoteState.index, quoteState.item, showToast]);

  const handleShare = useCallback(async () => {
    if (isAnimating || isSharing) {
      return;
    }

    setIsSharing(true);
    setShouldRenderSharePoster(true);

    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        showToast("Partilha indisponível neste dispositivo.", "error");
        return;
      }

      await new Promise<void>((resolve) => {
        InteractionManager.runAfterInteractions(() => resolve());
      });
      await waitForNextFrame();

      const capturedUri = await shareCardRef.current?.capture?.();

      if (!capturedUri) {
        showToast("Não foi possível gerar a arte.", "error");
        return;
      }

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: "Partilhar lapada",
      });
    } catch {
      showToast("Não foi possível partilhar agora.", "error");
    } finally {
      if (isMountedRef.current) {
        setIsSharing(false);
        setShouldRenderSharePoster(false);
      }
    }
  }, [isAnimating, isSharing, showToast]);

  const handleFavorite = useCallback(() => {
    setIsLiked((current) => !current);
  }, []);

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.screen}>
          <AppHeader />

          <ProgressBar
            progress={yearProgress.progress}
            percentage={yearProgress.percentage}
            year={yearProgress.year}
          />

          <View style={styles.cardArea}>
            <QuotePanel
              quote={quoteState.item}
              image={imageState.item}
              onFavorite={handleFavorite}
              onSave={handleSave}
              onShare={handleShare}
              isLiked={isLiked}
              isAnimating={isAnimating}
              actionsDisabled={actionsDisabled}
            />
          </View>

          <View style={styles.buttonWrap}>
            <GenerateButton
              onGenerate={handleGenerate}
              disabled={actionsDisabled}
            />
          </View>

          {toast ? (
            <View
              pointerEvents="none"
              style={[
                styles.toast,
                {
                  backgroundColor:
                    toast.kind === "error"
                      ? "rgba(255,107,125,0.16)"
                      : toast.kind === "warning"
                        ? "rgba(245,197,24,0.16)"
                        : "rgba(192,84,224,0.16)",
                  borderColor:
                    toast.kind === "error"
                      ? palette.danger
                      : toast.kind === "warning"
                        ? palette.accent
                        : palette.accent2,
                },
              ]}
            >
              <Text style={[styles.toastText, { color: palette.text }]}>
                {toast.message}
              </Text>
            </View>
          ) : null}

          {shouldRenderSharePoster ? (
            <View style={styles.hiddenPosterWrap} pointerEvents="none">
              <ViewShot
                ref={shareCardRef}
                style={styles.shareShot}
                options={{
                  format: "png",
                  quality: 1,
                  result: "tmpfile",
                  width: 1080,
                  height: 1080,
                }}
              >
                <SharePoster quote={quoteState.item} image={imageState.item} />
              </ViewShot>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  cardArea: {
    flex: 1,
    paddingTop: 10,
  },
  buttonWrap: {
    paddingTop: 14,
    paddingBottom: 100,
  },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 174,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  toastText: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  hiddenPosterWrap: {
    position: "absolute",
    left: -1200,
    top: 0,
    width: 1080,
    height: 1080,
  },
  shareShot: {
    width: 1080,
    height: 1080,
  },
});
