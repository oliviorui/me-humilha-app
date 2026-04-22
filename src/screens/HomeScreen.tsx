import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import GenerateButton from "../components/GenerateButton";
import SharePoster from "../components/SharePoster";
import SideMenu from "../components/SideMenu";
import ProgressBar from "../components/ProgressBar";

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

  const [isDailyMode, setIsDailyMode] = useState<boolean>(false);

  const [posterVariant, setPosterVariant] = useState<"square" | "story">(
    "square"
  );

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const yearProgress = getYearProgress();
  const percentageDecimal = yearProgress.progress * 100;

  function generateRandomPoster() {
    const nextQuote = getRandomItem(quotes, quoteState.index);
    const nextImage = getRandomItem(images, imageState.index);

    setQuoteState(nextQuote);
    setImageState(nextImage);
    setIsDailyMode(false);
  }

  function handleGenerate() {
    if (isDailyMode) {
      return;
    }

    generateRandomPoster();
  }

  function handleDailyMode() {
    const dailyQuote = getDailyQuote();

    setQuoteState({
      item: dailyQuote,
      index: -1,
    });

    setIsDailyMode(true);
    setMenuVisible(false);

    Alert.alert("Frase do dia", "Essa é a tua lapada oficial de hoje.");
  }

  function handleRandomMode() {
    generateRandomPoster();
    setMenuVisible(false);
  }

  function handleTogglePosterVariant() {
    setPosterVariant((current) => (current === "square" ? "story" : "square"));
    setMenuVisible(false);
  }

  async function handleSave() {
    try {
      const result = await saveFavorite({
        id: `${Date.now()}-${quoteState.index}-${imageState.index}`,
        quote: quoteState.item,
        image: imageState.item,
        createdAt: Date.now(),
      });

      setMenuVisible(false);

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

      setMenuVisible(false);

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: "Exportar poster",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível exportar agora.");
    }
  }

  function handleOpenFavorites() {
    setMenuVisible(false);
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

      setMenuVisible(false);

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
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSave={handleSave}
        onExport={handleShare}
        onFavorites={handleOpenFavorites}
        onNotifications={handleEnableNotifications}
        onDaily={handleDailyMode}
        onRandom={handleRandomMode}
        isDaily={isDailyMode}
        posterVariant={posterVariant}
        onTogglePosterVariant={handleTogglePosterVariant}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Pressable
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons
                name="menu-outline"
                size={26}
                color="#ffffff"
              />
            </Pressable>

            <BlurView
              intensity={18}
              tint="dark"
              style={styles.brandPill}
            >
              <View style={styles.brandSolidLayer} />
              <Text style={styles.brandPillText}>Me Humilha</Text>
            </BlurView>
          </View>

          <View style={styles.posterArea}>
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
          </View>

          <ProgressBar
            progress={yearProgress.progress}
            percentage={percentageDecimal}
            year={yearProgress.year}
          />

          <View style={styles.bottomPanel}>
            <GenerateButton
              onGenerate={handleGenerate}
              disabled={isDailyMode}
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
    backgroundColor: "#0A0A0F",
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  brandPill: {
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(16,16,22,0.88)",
  },
  brandSolidLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,10,16,0.42)",
  },
  brandPillText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    zIndex: 1,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,20,28,0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  posterArea: {
    flex: 1,
    justifyContent: "center",
  },
  posterCapture: {
    width: "100%",
    alignSelf: "center",
  },
  bottomPanel: {
    marginTop: 8,
  },
});
