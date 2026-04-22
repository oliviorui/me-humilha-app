import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onExport: () => void;
  onFavorites: () => void;
  onNotifications: () => void;
  onDaily: () => void;
};

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

function MenuItem({
  icon,
  label,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed ? styles.menuItemPressed : null,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color="#ffffff"
      />

      <Text style={styles.menuText}>
        {label}
      </Text>
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
}: SideMenuProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            visible ? 0 : 340,
            {
              duration: 280,
              easing: Easing.out(Easing.cubic),
            }
          ),
        },
      ],
      opacity: withTiming(
        visible ? 1 : 0,
        {
          duration: 220,
        }
      ),
    };
  });

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      />

      <Animated.View
        style={[
          styles.menuContainer,
          animatedStyle,
        ]}
      >
        <BlurView
          intensity={28}
          tint="dark"
          style={styles.menu}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Menu
            </Text>

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
              label="Frase do dia"
              onPress={onDaily}
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
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  menuContainer: {
    width: 300,
    height: "100%",
  },

  menu: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "rgba(10,10,14,0.75)",
    borderLeftWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  title: {
    color: "#ffffff",
    fontSize: 24,
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
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  menuItemPressed: {
    opacity: 0.82,
  },

  menuText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
