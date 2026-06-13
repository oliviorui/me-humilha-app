import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
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

export default function HomeTab() {
  const { fontsLoaded } = useAppFonts();
  const { palette } = useAppTheme();
  const shareCardRef = useRef<ViewShot | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );
  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const yearProgress = getYearProgress();

  function showToast(message: string, kind: ToastKind = "success") {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ message, kind });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2200);
  }

  function handleGenerate() {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setIsLiked(false);

    setTimeout(() => {
      const nextQuote = getRandomItem(quotes, quoteState.index);
      const nextImage = getRandomItem(images, imageState.index);

      setQuoteState(nextQuote);
      setImageState(nextImage);
      setIsAnimating(false);
    }, 750);
  }

  async function handleSave() {
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

      showToast("Lapada guardada com sucesso.", "success");
    } catch {
      showToast("Não foi possível guardar agora.", "error");
    }
  }

  async function handleShare() {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        showToast("Partilha indisponível neste dispositivo.", "error");
        return;
      }

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
    }
  }

  function handleFavorite() {
    setIsLiked((current) => !current);
  }

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
            />
          </View>

          <View style={styles.buttonWrap}>
            <GenerateButton
              onGenerate={handleGenerate}
              disabled={isAnimating}
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
  },
  cardArea: {
    flex: 1,
    paddingTop: 2,
  },
  buttonWrap: {
    paddingTop: 2,
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
