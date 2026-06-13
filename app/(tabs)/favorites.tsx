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

import AppHeader from "../../src/components/AppHeader";
import ScreenBackground from "../../src/components/ScreenBackground";
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
      Alert.alert("Erro", "Não foi possível remover.");
    }
  }

  function renderItem({ item }: { item: FavoriteItem }) {
    return (
      <View
        style={[
          styles.savedItem,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            shadowColor: palette.shadow,
          },
        ]}
      >
        <Image source={item.image} style={styles.thumb} resizeMode="cover" />

        <View style={styles.textBlock}>
          <Text
            style={[styles.savedText, { color: palette.text }]}
            numberOfLines={3}
          >
            {item.quote}
          </Text>

          <Text style={[styles.savedMeta, { color: palette.textMuted }]}>guardada para futuras vergonhas</Text>
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
          accessibilityLabel="Remover frase guardada"
        >
          <Ionicons name="trash-outline" size={16} color={palette.textMuted} />
        </Pressable>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.screen}>
          <AppHeader subtitle="as lapadas que mereceram arquivo" />

          <View style={styles.titleRow}>
            <View>
              <Text style={[styles.screenTitle, { color: palette.text }]}>GUARDADAS</Text>
              <Text style={[styles.screenSub, { color: palette.textMuted }]}>
                {favorites.length === 1
                  ? "1 frase salva"
                  : `${favorites.length} frases salvas`}
              </Text>
            </View>
          </View>

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
              <View style={styles.emptyState}>
                <View
                  style={[
                    styles.emptyIcon,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      shadowColor: palette.shadow,
                    },
                  ]}
                >
                  <Ionicons name="bookmark-outline" size={25} color={palette.accent2} />
                </View>

                <Text style={[styles.emptyTitle, { color: palette.text }]}>Ainda não guardaste nenhuma lapada</Text>

                <Text style={[styles.emptySub, { color: palette.textMuted }]}>Quando uma frase bater forte, toca em “Guardar” para ela aparecer aqui.</Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.emptyButton,
                    {
                      backgroundColor: palette.surface2,
                      borderColor: palette.border,
                      opacity: pressed ? 0.82 : 1,
                    },
                  ]}
                  onPress={() => router.navigate("/(tabs)")}
                >
                  <Ionicons name="sparkles-outline" size={16} color={palette.accent2} />
                  <Text style={[styles.emptyButtonText, { color: palette.text }]}>Gerar primeira</Text>
                </Pressable>
              </View>
            }
          />
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
    paddingBottom: 16,
  },
  titleRow: {
    marginBottom: 14,
  },
  screenTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    letterSpacing: 2,
    lineHeight: 34,
  },
  screenSub: {
    marginTop: 2,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    opacity: 0.75,
  },
  savedList: {
    gap: 12,
    paddingBottom: 112,
  },
  savedListEmpty: {
    flexGrow: 1,
    justifyContent: "center",
  },
  savedItem: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 18,
    paddingVertical: 42,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 3,
  },
  emptyTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 16,
    textAlign: "center",
  },
  emptySub: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    opacity: 0.68,
    maxWidth: 290,
  },
  emptyButton: {
    marginTop: 10,
    minHeight: 42,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyButtonText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 13,
  },
});
