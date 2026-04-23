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
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

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
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.savedDelete,
            {
              opacity: pressed ? 0.72 : 1,
            },
          ]}
          onPress={() => handleRemove(item.id)}
        >
          <Ionicons
            name="trash-outline"
            size={16}
            color={palette.textMuted}
          />
        </Pressable>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <View style={styles.screen}>
        <AppHeader />

        <Text style={[styles.screenTitle, { color: palette.text }]}>
          GUARDADAS
        </Text>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.savedList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View
                style={[
                  styles.emptyIcon,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                  },
                ]}
              >
                <Ionicons
                  name="bookmark-outline"
                  size={22}
                  color={palette.textMuted}
                />
              </View>

              <Text style={[styles.emptyTitle, { color: palette.text }]}>
                Nada guardado ainda
              </Text>

              <Text style={[styles.emptySub, { color: palette.textMuted }]}>
                As humilhações ficam aqui.
              </Text>
            </View>
          }
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  screenTitle: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 16,
  },
  savedList: {
    gap: 10,
    paddingBottom: 100,
  },
  savedItem: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
  },
  savedText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 20,
    lineHeight: 22,
  },
  savedDelete: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
  },
  emptySub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    opacity: 0.6,
  },
});
