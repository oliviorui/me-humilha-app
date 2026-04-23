import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

import AppHeader from "../../src/components/AppHeader";
import ProgressBar from "../../src/components/ProgressBar";
import QuotePanel from "../../src/components/QuotePanel";
import GenerateButton from "../../src/components/GenerateButton";
import ScreenBackground from "../../src/components/ScreenBackground";

import { useAppFonts } from "../../src/hooks/useAppFonts";
import { getYearProgress } from "../../src/utils/getYearProgress";
import { saveFavorite } from "../../src/utils/favorites";
import {
  getRandomItem,
  type RandomItemResult,
} from "../../src/utils/getRandomItem";
import { images, type AppImage } from "../../src/data/images";
import { quotes, type Quote } from "../../src/data/quotes";

export default function HomeTab() {
  const { fontsLoaded } = useAppFonts();
  const shareCardRef = useRef<ViewShot | null>(null);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );
  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const yearProgress = getYearProgress();

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
        Alert.alert("Já guardada", "Essa lapada já está nas guardadas.");
        return;
      }

      Alert.alert("Guardado", "Lapada guardada com sucesso.");
    } catch {
      Alert.alert("Erro", "Não foi possível guardar agora.");
    }
  }

  async function handleShare() {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert("Erro", "A partilha não está disponível neste dispositivo.");
        return;
      }

      const capturedUri = await shareCardRef.current?.capture?.();

      if (!capturedUri) {
        Alert.alert("Erro", "Não foi possível gerar a arte.");
        return;
      }

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: "Partilhar lapada",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível partilhar agora.");
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
              showActions
            />
          </View>

          <View style={styles.buttonWrap}>
            <GenerateButton
              onGenerate={handleGenerate}
              disabled={isAnimating}
            />
          </View>

          <View style={styles.hiddenCaptureArea}>
            <ViewShot
              ref={shareCardRef}
              options={{
                format: "png",
                quality: 1,
                result: "tmpfile",
              }}
              style={styles.capture}
            >
              <QuotePanel
                quote={quoteState.item}
                image={imageState.item}
                showActions={false}
                forExport
              />
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
    paddingHorizontal: 20,
  },
  cardArea: {
    flex: 1,
    paddingTop: 4,
  },
  buttonWrap: {
    paddingTop: 8,
    paddingBottom: 82,
  },
  hiddenCaptureArea: {
    position: "absolute",
    left: -10000,
    top: -10000,
    opacity: 0,
  },
  capture: {
    width: 1080,
    height: 1080,
  },
});
