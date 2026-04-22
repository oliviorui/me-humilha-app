import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed ? styles.menuItemPressed : null,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color="#ffffff" />
      <Text style={styles.menuText}>{label}</Text>
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
        <Pressable style={styles.overlay} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.menuContainer, menuAnimatedStyle]}>
        <BlurView intensity={22} tint="dark" style={styles.menu}>
          <View style={styles.menuSolidLayer} />

          <View style={styles.header}>
            <Text style={styles.title}>Me Humilha</Text>

            <Pressable onPress={onClose}>
              <Ionicons
                name="close-outline"
                size={28}
                color="#ffffff"
              />
            </Pressable>
          </View>

          <View style={styles.items}>
            <MenuItem
              icon="bookmark-outline"
              label="Guardar"
              onPress={onSave}
            />

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
        </BlurView>
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
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  menuContainer: {
    width: 300,
    height: "100%",
  },
  menu: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "rgba(8,8,12,0.90)",
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },
  menuSolidLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8,8,12,0.72)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    zIndex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },
  items: {
    gap: 14,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  menuItemPressed: {
    opacity: 0.82,
  },
  menuText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
  },
});
