import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppTheme } from "../theme/ThemeProvider";
import ThemeToggle from "./ThemeToggle";

type PosterVariant = "square" | "story";

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onExport: () => void;
  onFavorites: () => void;
  onNotifications: () => void;
  onDaily: () => void;
  onRandom: () => void;
  isDaily: boolean;
  posterVariant: PosterVariant;
  onTogglePosterVariant: () => void;
};

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

function MenuItem({ icon, label, onPress }: MenuItemProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        {
          backgroundColor: palette.surfaceStrong,
          borderColor: palette.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={palette.text} />
      <Text style={[styles.menuText, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );
}

export default function SideMenu({
  visible,
  onClose,
  onSave,
  onExport,
  onFavorites,
  onNotifications,
  onDaily,
  onRandom,
  isDaily,
  posterVariant,
  onTogglePosterVariant,
}: SideMenuProps) {
  const { palette } = useAppTheme();

  const [isMounted, setIsMounted] = useState<boolean>(visible);

  const translateX = useSharedValue(-340);
  const overlayOpacity = useSharedValue(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (visible) {
      setIsMounted(true);

      translateX.value = withTiming(0, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });

      overlayOpacity.value = withTiming(1, {
        duration: 220,
      });
    } else if (isMounted) {
      translateX.value = withTiming(-340, {
        duration: 260,
        easing: Easing.in(Easing.cubic),
      });

      overlayOpacity.value = withTiming(0, {
        duration: 200,
      });

      timeoutId = setTimeout(() => {
        setIsMounted(false);
      }, 280);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, isMounted, overlayOpacity, translateX]);

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  if (!isMounted) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.overlayWrapper, overlayAnimatedStyle]}>
        <Pressable
          style={[styles.overlay, { backgroundColor: palette.overlay }]}
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
        <View
          style={[
            styles.menu,
            {
              backgroundColor: palette.backgroundAlt,
              borderRightColor: palette.border,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logo}
              />
              <Text style={[styles.title, { color: palette.text }]}>
                Me Humilha
              </Text>
            </View>

            <View style={styles.headerRight}>
              <ThemeToggle />
              <Pressable onPress={onClose}>
                <Ionicons name="close-outline" size={28} color={palette.text} />
              </Pressable>
            </View>
          </View>

          <View style={styles.items}>
            <MenuItem icon="bookmark-outline" label="Guardar" onPress={onSave} />
            <MenuItem
              icon="share-social-outline"
              label="Exportar"
              onPress={onExport}
            />
            <MenuItem
              icon="heart-outline"
              label="Favoritos"
              onPress={onFavorites}
            />
            <MenuItem
              icon="notifications-outline"
              label="Notificações"
              onPress={onNotifications}
            />
            <MenuItem
              icon="sunny-outline"
              label={isDaily ? "Frase do dia ativa" : "Frase do dia"}
              onPress={onDaily}
            />
            <MenuItem
              icon="shuffle-outline"
              label="Voltar ao aleatório"
              onPress={onRandom}
            />
            <MenuItem
              icon="resize-outline"
              label={
                posterVariant === "square"
                  ? "Formato: 1:1 Feed"
                  : "Formato: 9:16 Story"
              }
              onPress={onTogglePosterVariant}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  overlayWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
  },
  menuContainer: {
    width: 310,
    height: "100%",
  },
  menu: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 20,
    borderRightWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    gap: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
  },
  items: {
    gap: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
  },
});
