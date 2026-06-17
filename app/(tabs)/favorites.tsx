import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import ScreenBackground from "../../src/components/ScreenBackground";
import { Card, EmptyState, LoadingScreen, SectionHeader } from "../../src/components/ui";
import { useAppTheme } from "../../src/theme/ThemeProvider";
import {
  getFavorites,
  removeFavorite,
  type FavoriteItem,
} from "../../src/utils/favorites";
import { useAppFonts } from "../../src/hooks/useAppFonts";

export default function FavoritesTab() {
  const { palette } = useAppTheme();
  const { fontsLoaded } = useAppFonts();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } finally {
      setIsLoading(false);
    }
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
      Alert.alert("Erro", "Não foi possível remover.");
    }
  }

  function renderItem({ item }: { item: FavoriteItem }) {
    return (
      <Card elevated style={styles.savedItemCard} contentStyle={styles.savedItem}>
        <Image
          source={item.image}
          style={styles.thumb}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <View style={styles.textBlock}>
          <Text
            style={[styles.savedText, { color: palette.text }]}
            numberOfLines={3}
          >
            {item.quote}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.savedDelete,
            {
              backgroundColor: palette.surface2,
              borderColor: palette.border,
              opacity: pressed ? 0.72 : 1,
            },
          ]}
          onPress={() => handleRemove(item.id)}
          accessibilityRole="button"
          accessibilityLabel="Remover frase guardada"
          accessibilityHint="Remove esta frase da lista de guardadas."
        >
          <Ionicons name="trash-outline" size={16} color={palette.textMuted} />
        </Pressable>
      </Card>
    );
  }

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.screen}>
          <SectionHeader
            title="Guardadas"
            meta={favorites.length === 1 ? "1 salva" : `${favorites.length} salvas`}
          />

          {isLoading ? (
            <View style={styles.loadingWrap}>
              <EmptyState
                icon="hourglass-outline"
                title="A carregar arquivo"
                description="Estamos a procurar as tuas lapadas guardadas neste dispositivo."
              />
            </View>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.savedList,
                favorites.length === 0 ? styles.savedListEmpty : null,
              ]}
              ListEmptyComponent={
                <EmptyState
                  icon="bookmark-outline"
                  title="Ainda não guardaste nenhuma lapada"
                  description="Quando uma frase bater forte, toca em “Guardar” para ela aparecer aqui."
                  actionLabel="Gerar primeira"
                  actionIcon="sparkles-outline"
                  onAction={() => router.navigate("/(tabs)")}
                />
              }
            />
          )}
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
    paddingTop: 28,
    paddingBottom: 16,
  },
  savedList: {
    gap: 12,
    paddingBottom: 112,
  },
  savedListEmpty: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 112,
  },
  savedItemCard: {
    borderRadius: 20,
  },
  savedItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 16,
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  savedText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 21,
    lineHeight: 23,
    letterSpacing: 0.2,
  },
  savedMeta: {
    marginTop: 4,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 10.5,
    opacity: 0.62,
  },
  savedDelete: {
    width: 36,
    height: 36,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
