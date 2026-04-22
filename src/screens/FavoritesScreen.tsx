import { useCallback, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

import {
  getFavorites,
  removeFavorite,
  type FavoriteItem,
} from "../utils/favorites";
import SharePoster from "../components/SharePoster";
import { useAppFonts } from "../hooks/useAppFonts";
import { useAppTheme } from "../theme/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";

export default function FavoritesScreen() {
  const router = useRouter();
  const shareCardRef = useRef<ViewShot | null>(null);
  const { fontsLoaded } = useAppFonts();
  const { palette } = useAppTheme();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [shareTarget, setShareTarget] = useState<FavoriteItem | null>(null);

  const loadFavorites = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadFavorites();
    }, [loadFavorites])
  );

  async function handleRemove(id: string) {
    try {
      await removeFavorite(id);
      await loadFavorites();
    } catch {
      Alert.alert("Erro", "Não foi possível remover o favorito.");
    }
  }

  async function handleExport(item: FavoriteItem) {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (!isSharingAvailable) {
        Alert.alert(
          "Erro",
          "A partilha não está disponível neste dispositivo."
        );
        return;
      }

      setShareTarget(item);

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 150);
      });

      const capturedUri = await shareCardRef.current?.capture?.();

      if (!capturedUri) {
        Alert.alert("Erro", "Não foi possível gerar a arte para exportar.");
        setShareTarget(null);
        return;
      }

      await Sharing.shareAsync(capturedUri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: "Exportar poster",
      });

      setShareTarget(null);
    } catch {
      setShareTarget(null);
      Alert.alert("Erro", "Não foi possível exportar esta lapada.");
    }
  }

  function renderItem({ item }: { item: FavoriteItem }) {
    return (
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          imageStyle={styles.cardImage}
          style={styles.card}
        >
          <View
            style={[
              styles.cardOverlay,
              { backgroundColor: palette.overlay },
            ]}
          />
          <View
            style={[
              styles.outerBorder,
              { borderColor: palette.white },
            ]}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardQuote}>{item.quote}</Text>

            <View style={styles.cardActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                    opacity: pressed ? 0.84 : 1,
                  },
                ]}
                onPress={() => handleExport(item)}
              >
                <Ionicons
                  name="share-social-outline"
                  size={16}
                  color={palette.text}
                />
                <Text style={[styles.actionText, { color: palette.text }]}>
                  Exportar
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: palette.surfaceStrong,
                    borderColor: palette.border,
                    opacity: pressed ? 0.84 : 1,
                  },
                ]}
                onPress={() => handleRemove(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={palette.text}
                />
                <Text style={[styles.actionText, { color: palette.text }]}>
                  Remover
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingScreen, { backgroundColor: palette.background }]}>
        <Text style={[styles.loadingText, { color: palette.text }]}>
          A preparar as lapadas...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topBar}>
              <Pressable
                style={[
                  styles.backButton,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  },
                ]}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={22}
                  color={palette.text}
                />
              </Pressable>

              <View style={styles.rightCluster}>
                <ThemeToggle />

                <View
                  style={[
                    styles.brandChip,
                    {
                      backgroundColor: palette.surfaceStrong,
                      borderColor: palette.border,
                    },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/icon.png")}
                    style={styles.brandLogo}
                  />
                  <Text style={[styles.brandText, { color: palette.text }]}>
                    Me Humilha
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.title, { color: palette.text }]}>
              Favoritos
            </Text>
            <Text style={[styles.subtitle, { color: palette.textMuted }]}>
              As lapadas que te marcaram mais do que deviam.
            </Text>
          </View>

          {favorites.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                },
              ]}
            >
              <Ionicons
                name="heart-dislike-outline"
                size={36}
                color={palette.textSoft}
                style={styles.emptyIcon}
              />

              <Text style={[styles.emptyTitle, { color: palette.text }]}>
                Nada guardado ainda.
              </Text>

              <Text style={[styles.emptyText, { color: palette.textMuted }]}>
                Guarda algumas lapadas e elas aparecem aqui.
              </Text>
            </View>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </SafeAreaView>

      <View style={styles.hiddenCaptureArea}>
        {shareTarget ? (
          <ViewShot
            ref={shareCardRef}
            options={{
              format: "png",
              quality: 1,
              result: "tmpfile",
            }}
            style={styles.hiddenPosterCapture}
          >
            <SharePoster
              image={shareTarget.image}
              quote={shareTarget.quote}
              variant="square"
            />
          </ViewShot>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "700",
  },
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  header: {
    marginBottom: 16,
    gap: 8,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  rightCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  brandChip: {
    minHeight: 46,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandLogo: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  brandText: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  emptyCard: {
    marginTop: 24,
    borderRadius: 18,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1,
  },
  emptyIcon: {
    zIndex: 1,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
  },
  listContent: {
    paddingBottom: 20,
    gap: 16,
  },
  cardWrapper: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#111827",
  },
  card: {
    minHeight: 240,
    justifyContent: "center",
  },
  cardImage: {
    opacity: 1,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  outerBorder: {
    ...StyleSheet.absoluteFillObject,
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
    borderWidth: 1.2,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  cardQuote: {
    flex: 1,
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "700",
    fontFamily: "CormorantGaramond_700Bold",
    textShadowColor: "rgba(0,0,0,0.28)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "800",
  },
  hiddenCaptureArea: {
    position: "absolute",
    top: -10000,
    left: -10000,
    opacity: 0,
  },
  hiddenPosterCapture: {
    width: 1080,
  },
});
