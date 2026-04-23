import { Alert, StyleSheet, View } from "react-native";
import { useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

import AppHeader from "../../src/components/AppHeader";
import ProgressBar from "../../src/components/ProgressBar";
import QuotePanel from "../../src/components/QuotePanel";
import GenerateButton from "../../src/components/GenerateButton";
import SharePoster from "../../src/components/SharePoster";

import { useAppTheme } from "../../src/theme/ThemeProvider";
import { getYearProgress } from "../../src/utils/getYearProgress";
import { saveFavorite } from "../../src/utils/favorites";
import {
  getRandomItem,
  type RandomItemResult,
} from "../../src/utils/getRandomItem";
import { images, type AppImage } from "../../src/data/images";
import { quotes, type Quote } from "../../src/data/quotes";

export default function HomeTab() {
  const { palette } = useAppTheme();
  const shareCardRef = useRef<ViewShot | null>(null);

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );

  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );

  const yearProgress = getYearProgress();

  function handleGenerate() {
    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
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
        dialogTitle: "Partilhar poster",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível partilhar agora.");
    }
  }

  function handleFavorite() {
    Alert.alert("Favorito", "Usa Guardar para meter essa lapada nas guardadas.");
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <AppHeader />

      <ProgressBar
        progress={yearProgress.progress}
        percentage={yearProgress.percentage}
        year={yearProgress.year}
      />

      <View style={styles.content}>
        <QuotePanel
          quote={quoteState.item}
          image={imageState.item}
          onFavorite={handleFavorite}
          onSave={handleSave}
          onShare={handleShare}
        />
      </View>

      <GenerateButton onGenerate={handleGenerate} disabled={false} />

      <ViewShot
        ref={shareCardRef}
        options={{
          format: "png",
          quality: 1,
          result: "tmpfile",
        }}
        style={styles.hiddenCapture}
      >
        <SharePoster
          image={imageState.item}
          quote={quoteState.item}
          variant="square"
        />
      </ViewShot>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
  },
  hiddenCapture: {
    position: "absolute",
    left: -10000,
    top: -10000,
    width: 1080,
    opacity: 0,
  },
});
