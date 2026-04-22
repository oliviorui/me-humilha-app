import { useCallback, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
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

export default function FavoritesScreen() {
  const router = useRouter();
  const shareCardRef = useRef<ViewShot | null>(null);
  const { fontsLoaded } = useAppFonts();

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
          <View style={styles.cardOverlay} />
          <View style={styles.outerBorder} />

          <View style={styles.cardContent}>
            <Text style={styles.cardQuote}>{item.quote}</Text>

            <View style={styles.cardActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed ? styles.actionButtonPressed : null,
                ]}
                onPress={() => handleExport(item)}
              >
                <Ionicons
                  name="share-social-outline"
                  size={16}
                  color="#ffffff"
                />
                <Text style={styles.actionText}>Exportar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.removeButton,
                  pressed ? styles.actionButtonPressed : null,
                ]}
                onPress={() => handleRemove(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color="#ffffff"
                />
                <Text style={styles.actionText}>Remover</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>A preparar as lapadas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topBar}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={22}
                  color="#ffffff"
                />
              </Pressable>

              <BlurView intensity={18} tint="dark" style={styles.brandPill}>
                <View style={styles.brandSolidLayer} />
                <Text style={styles.brandPillText}>Me Humilha</Text>
              </BlurView>
            </View>

            <Text style={styles.title}>Favoritos</Text>
            <Text style={styles.subtitle}>
              As lapadas que te marcaram mais do que deviam.
            </Text>
          </View>

          {favorites.length === 0 ? (
            <BlurView intensity={18} tint="dark" style={styles.emptyCard}>
              <View style={styles.emptySolidLayer} />

              <Ionicons
                name="heart-dislike-outline"
                size={36}
                color="rgba(255,255,255,0.82)"
                style={styles.emptyIcon}
              />

              <Text style={styles.emptyTitle}>Nada guardado ainda.</Text>

              <Text style={styles.emptyText}>
                Guarda algumas lapadas e elas aparecem aqui.
              </Text>
            </BlurView>
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
    backgroundColor: "#0A0A0F",
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
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,20,28,0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
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
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
    lineHeight: 34,
  },
  subtitle: {
    color: "rgba(255,255,255,0.62)",
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
    borderColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
    backgroundColor: "rgba(15,15,20,0.86)",
  },
  emptySolidLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(12,12,16,0.54)",
  },
  emptyIcon: {
    zIndex: 1,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    zIndex: 1,
  },
  emptyText: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
    zIndex: 1,
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
    backgroundColor: "rgba(20,34,48,0.28)",
  },
  outerBorder: {
    ...StyleSheet.absoluteFillObject,
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.82)",
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
    backgroundColor: "rgba(22,22,30,0.94)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  removeButton: {
    backgroundColor: "rgba(18,18,24,0.94)",
  },
  actionButtonPressed: {
    opacity: 0.84,
  },
  actionText: {
    color: "#ffffff",
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
