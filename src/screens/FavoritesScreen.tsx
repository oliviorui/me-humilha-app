import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";

import {
  getFavorites,
  removeFavorite,
  type FavoriteItem,
} from "../utils/favorites";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

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

  async function handleShare(item: FavoriteItem) {
    try {
      await Share.share({
        message: item.quote,
      });
    } catch {
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

          <View style={styles.frame}>
            <View style={styles.cardContent}>
              <Text style={styles.cardQuote}>{item.quote}</Text>

              <View style={styles.cardActions}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionButton,
                    pressed ? styles.actionButtonPressed : null,
                  ]}
                  onPress={() => handleShare(item)}
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
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topBar}>
              <BlurView intensity={24} tint="dark" style={styles.brandPill}>
                <Text style={styles.brandPillText}>Me Humilha</Text>
              </BlurView>

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
            </View>

            <Text style={styles.title}>Favoritos</Text>
            <Text style={styles.subtitle}>
              As lapadas que te marcaram mais do que deviam.
            </Text>
          </View>

          {favorites.length === 0 ? (
            <BlurView intensity={22} tint="dark" style={styles.emptyCard}>
              <Ionicons
                name="heart-dislike-outline"
                size={36}
                color="rgba(255,255,255,0.82)"
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  brandPill: {
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
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
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
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
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyText: {
    color: "rgba(255,255,255,0.68)",
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
    borderRadius: 28,
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
    backgroundColor: "rgba(20,34,48,0.34)",
  },
  frame: {
    flex: 1,
    margin: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.75)",
    borderRadius: 4,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 24,
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
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  removeButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  actionButtonPressed: {
    opacity: 0.84,
  },
  actionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});
