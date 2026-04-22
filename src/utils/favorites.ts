import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteItem = {
  id: string;
  quote: string;
  image: number;
  createdAt: number;
};

type SaveFavoriteResult = {
  saved: boolean;
};

const STORAGE_KEY = "me_humilha_favorites";
const LEGACY_STORAGE_KEY = "reverse_coach_favorites";

async function getStoredRawFavorites(): Promise<string | null> {
  const currentData = await AsyncStorage.getItem(STORAGE_KEY);

  if (currentData) {
    return currentData;
  }

  const legacyData = await AsyncStorage.getItem(LEGACY_STORAGE_KEY);

  if (legacyData) {
    await AsyncStorage.setItem(STORAGE_KEY, legacyData);
    await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
    return legacyData;
  }

  return null;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const rawData = await getStoredRawFavorites();

    if (!rawData) {
      return [];
    }

    const parsedData: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData as FavoriteItem[];
  } catch {
    return [];
  }
}

export async function saveFavorite(
  item: FavoriteItem
): Promise<SaveFavoriteResult> {
  try {
    const currentFavorites = await getFavorites();

    const alreadyExists = currentFavorites.some(
      (favorite) =>
        favorite.quote === item.quote && favorite.image === item.image
    );

    if (alreadyExists) {
      return {
        saved: false,
      };
    }

    const updatedFavorites = [item, ...currentFavorites];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

    return {
      saved: true,
    };
  } catch {
    throw new Error("Não foi possível guardar o favorito.");
  }
}

export async function removeFavorite(id: string): Promise<void> {
  try {
    const currentFavorites = await getFavorites();
    const updatedFavorites = currentFavorites.filter(
      (favorite) => favorite.id !== id
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  } catch {
    throw new Error("Não foi possível remover o favorito.");
  }
}
