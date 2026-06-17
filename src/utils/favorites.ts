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
const MAX_FAVORITES = 150;

let favoritesWriteQueue: Promise<unknown> = Promise.resolve();
let favoritesCache: FavoriteItem[] | null = null;
let hasMigratedLegacyData = false;

function enqueueFavoritesWrite<T>(operation: () => Promise<T>): Promise<T> {
  const queuedOperation = favoritesWriteQueue.then(operation, operation);
  favoritesWriteQueue = queuedOperation.catch(() => undefined);
  return queuedOperation;
}

function getFavoriteKey(item: Pick<FavoriteItem, "quote" | "image">): string {
  return `${item.quote.trim().toLowerCase()}::${item.image}`;
}

function isFavoriteItem(value: unknown): value is FavoriteItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.quote === "string" &&
    candidate.quote.trim().length > 0 &&
    typeof candidate.image === "number" &&
    Number.isFinite(candidate.image) &&
    typeof candidate.createdAt === "number" &&
    Number.isFinite(candidate.createdAt)
  );
}

function normalizeFavorites(data: unknown): FavoriteItem[] {
  if (!Array.isArray(data)) {
    return [];
  }

  const seen = new Set<string>();
  const normalized: FavoriteItem[] = [];

  for (const item of data) {
    if (!isFavoriteItem(item)) {
      continue;
    }

    const key = getFavoriteKey(item);

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push({
      ...item,
      quote: item.quote.trim(),
    });
  }

  return normalized
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_FAVORITES);
}

async function getStoredRawFavorites(): Promise<string | null> {
  const currentData = await AsyncStorage.getItem(STORAGE_KEY);

  if (currentData) {
    return currentData;
  }

  if (hasMigratedLegacyData) {
    return null;
  }

  hasMigratedLegacyData = true;
  const legacyData = await AsyncStorage.getItem(LEGACY_STORAGE_KEY);

  if (legacyData) {
    await AsyncStorage.setItem(STORAGE_KEY, legacyData);
    await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
    return legacyData;
  }

  return null;
}

async function persistFavorites(favorites: FavoriteItem[]) {
  favoritesCache = favorites;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  if (favoritesCache) {
    return favoritesCache;
  }

  try {
    const rawData = await getStoredRawFavorites();

    if (!rawData) {
      favoritesCache = [];
      return favoritesCache;
    }

    const parsedData: unknown = JSON.parse(rawData);
    const normalizedFavorites = normalizeFavorites(parsedData);

    favoritesCache = normalizedFavorites;

    if (rawData !== JSON.stringify(normalizedFavorites)) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedFavorites));
    }

    return normalizedFavorites;
  } catch {
    favoritesCache = [];
    return favoritesCache;
  }
}

export async function saveFavorite(
  item: FavoriteItem
): Promise<SaveFavoriteResult> {
  return enqueueFavoritesWrite(async () => {
    try {
      const currentFavorites = await getFavorites();
      const itemKey = getFavoriteKey(item);

      const alreadyExists = currentFavorites.some(
        (favorite) => getFavoriteKey(favorite) === itemKey
      );

      if (alreadyExists) {
        return {
          saved: false,
        };
      }

      const updatedFavorites = normalizeFavorites([item, ...currentFavorites]);

      await persistFavorites(updatedFavorites);

      return {
        saved: true,
      };
    } catch {
      throw new Error("Não foi possível guardar o favorito.");
    }
  });
}

export async function removeFavorite(id: string): Promise<void> {
  return enqueueFavoritesWrite(async () => {
    try {
      const currentFavorites = await getFavorites();

      const updatedFavorites = currentFavorites.filter(
        (favorite) => favorite.id !== id
      );

      await persistFavorites(updatedFavorites);
    } catch {
      throw new Error("Não foi possível remover o favorito.");
    }
  });
}
