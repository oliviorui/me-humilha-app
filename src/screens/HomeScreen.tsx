import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ProgressBar from "../components/ProgressBar";
import GenerateButton from "../components/GenerateButton";
import SharePoster from "../components/SharePoster";

import { quotes, type Quote } from "../data/quotes";
import { images, type AppImage } from "../data/images";
import {
  getRandomItem,
  type RandomItemResult,
} from "../utils/getRandomItem";
import { getYearProgress } from "../utils/getYearProgress";
import { saveFavorite } from "../utils/favorites";
import {
  requestNotificationPermission,
  scheduleDailyNotification,
} from "../utils/notifications";
import { getDailyQuote } from "../utils/getDailyQuote";
import { useAppFonts } from "../hooks/useAppFonts";

export default function HomeScreen() {
  const router = useRouter();
  const shareCardRef = useRef<ViewShot | null>(null);

  const { fontsLoaded } = useAppFonts();

  const [quoteState, setQuoteState] = useState<RandomItemResult<Quote>>(() =>
    getRandomItem(quotes)
  );

  const [imageState, setImageState] = useState<RandomItemResult<AppImage>>(() =>
    getRandomItem(images)
  );

  const [posterVariant, setPosterVariant] = useState<"square" | "story">(
  "square"
);

  const [isDailyMode, setIsDailyMode] = useState<boolean>(false);

  const yearProgress = getYearProgress();

  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    backgroundOpacity.value = 0.86;
    backgroundOpacity.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [imageState.item, backgroundOpacity]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  function handleGenerate() {
    if (isDailyMode) {
      return;
    }

    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
  }

  function handleDailyMode() {
    const dailyQuote = getDailyQuote();

    setQuoteState({
      item: dailyQuote,
      index: -1,
    });

    setIsDailyMode(true);

    Alert.alert("Frase do dia", "Essa é a tua lapada oficial de hoje.");
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
        Alert.alert("Já guardada", "Essa lapada já está nos favoritos.");
        return;
      }

      Alert.alert("Guardado", "Lapada salva com sucesso.");
    } catch {
      Alert.alert("Erro", "Não foi possível guardar a lapada.");
    }
  }

  async function handleShare() {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert(
          "Erro",
          "A partilha não está disponível neste dispositivo."
        );
        return;
      }

      const capturedUri = await shareCardRef.current?.capture?.();

      if (!capturedUri) {
        Alert.alert(
          "Erro",
          "Não foi possível gerar a arte para partilhar."
        );
        return;
      }

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: "Compartilhar poster",
      });
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível compartilhar agora."
      );
    }
  }

  function handleOpenFavorites() {
    router.push("/favorites");
  }

  async function handleEnableNotifications() {
    try {
      const hasPermission = await requestNotificationPermission();

      if (!hasPermission) {
        Alert.alert(
          "Permissão negada",
          "Ativa as notificações nas definições do telemóvel."
        );
        return;
      }

      const scheduled = await scheduleDailyNotification();

      if (!scheduled) {
        Alert.alert(
          "Limitação do Expo Go",
          "Notificações não funcionam aqui. Só em build real."
        );
        return;
      }

      Alert.alert("Ativado", "Agora vais receber lapadas diárias.");
    } catch {
      Alert.alert("Erro", "Não foi possível ativar.");
    }
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>A preparar a lapada...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.backgroundLayer, backgroundAnimatedStyle]}>
        <ImageBackground
          source={imageState.item}
          resizeMode="cover"
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.pageOverlay} />
        </ImageBackground>
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.heroHeader}>
            <BlurView intensity={24} tint="dark" style={styles.brandPill}>
              <Text style={styles.brandPillText}>coach reverso.exe</Text>
            </BlurView>

            <Text style={styles.heroTitle}>
              {isDailyMode ? "Frase do dia" : "Poster da lapada"}
            </Text>

            <Text style={styles.heroSubtitle}>
              {isDailyMode
                ? "Uma verdade inconveniente, em formato de poster."
                : "Gera uma lapada e transforma isso em conteúdo compartilhável."}
            </Text>
          </View>

          <ViewShot
            ref={shareCardRef}
            options={{
              format: "png",
              quality: 1,
              result: "tmpfile",
            }}
            style={styles.posterCapture}
          >
            <SharePoster
              image={imageState.item}
              quote={quoteState.item}
              variant={posterVariant}
            />
          </ViewShot>

          <Text
            style={{
              color: "#ffffff",
              marginBottom: 12,
              fontWeight: "700",
            }}
            onPress={() =>
              setPosterVariant((current) =>
                current === "square" ? "story" : "square"
              )
            }
          >
            Formato: {posterVariant === "square" ? "1:1 Feed" : "9:16 Story"}
          </Text>

          <ProgressBar
            progress={yearProgress.progress}
            percentage={yearProgress.percentage}
            year={yearProgress.year}
          />

          <View style={styles.bottomPanel}>
            <GenerateButton
              onGenerate={handleGenerate}
              onShare={handleShare}
              onSave={handleSave}
              onOpenFavorites={handleOpenFavorites}
              onEnableNotifications={handleEnableNotifications}
              onDaily={handleDailyMode}
              isDaily={isDailyMode}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  screen: {
    flex: 1,
    backgroundColor: "#050505",
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.28,
  },
  pageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,8,12,0.68)",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  heroHeader: {
    gap: 8,
    marginBottom: 14,
  },
  brandPill: {
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  brandPillText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.9,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
    lineHeight: 34,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  posterCapture: {
    width: "100%",
    alignSelf: "center",
  },
  bottomPanel: {
    marginTop: 2,
  },
});
