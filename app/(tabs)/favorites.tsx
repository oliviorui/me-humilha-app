import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import AppHeader from "../../src/components/AppHeader";
import ProgressBar from "../../src/components/ProgressBar";
import { useAppTheme } from "../../src/theme/ThemeProvider";
import { getYearProgress } from "../../src/utils/getYearProgress";
import {
  getFavorites,
  removeFavorite,
  type FavoriteItem,
} from "../../src/utils/favorites";

export default function FavoritesTab() {
  const { palette } = useAppTheme();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const yearProgress = getYearProgress();

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
          styles.itemCard,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.itemDot,
            { backgroundColor: palette.primary },
          ]}
        />

        <Text style={[styles.itemText, { color: palette.text }]}>
          {item.quote}
        </Text>

        <Pressable
          style={styles.trashButton}
          onPress={() => handleRemove(item.id)}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={palette.textMuted}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <AppHeader />

      <ProgressBar
        progress={yearProgress.progress}
        percentage={yearProgress.percentage}
        year={yearProgress.year}
      />

      <Text style={[styles.title, { color: palette.text }]}>GUARDADAS</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: palette.surface,
                borderColor: palette.border,
              },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: palette.text }]}>
              Nada guardado ainda.
            </Text>
            <Text style={[styles.emptyText, { color: palette.textMuted }]}>
              Guarda algumas lapadas e elas aparecem aqui.
            </Text>
          </View>
        }
      />
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
  title: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 16,
  },
  listContent: {
    gap: 14,
    paddingBottom: 20,
  },
  itemCard: {
    minHeight: 96,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  itemDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  trashButton: {
    paddingTop: 4,
    paddingLeft: 4,
  },
  emptyState: {
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
