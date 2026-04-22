import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type GenerateButtonProps = {
  onGenerate: () => void;
  onShare: () => void;
  onSave: () => void;
  onOpenFavorites: () => void;
  onEnableNotifications: () => void;
  onDaily: () => void;
  isDaily: boolean;
};

type IconName = keyof typeof Ionicons.glyphMap;

type ActionButtonProps = {
  label: string;
  icon: IconName;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

function ActionButton({
  label,
  icon,
  onPress,
  variant = "secondary",
  disabled = false,
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonBase,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        pressed && !disabled ? styles.buttonPressed : null,
        disabled ? styles.buttonDisabled : null,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <View style={styles.buttonInner}>
        <View
          style={[
            styles.iconWrap,
            isPrimary ? styles.primaryIconWrap : styles.secondaryIconWrap,
          ]}
        >
          <Ionicons
            name={icon}
            size={18}
            color={isPrimary ? "#111111" : "#ffffff"}
          />
        </View>

        <Text
          style={[
            styles.buttonText,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function GenerateButton({
  onGenerate,
  onShare,
  onSave,
  onOpenFavorites,
  onEnableNotifications,
  onDaily,
  isDaily,
}: GenerateButtonProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });

    translateY.value = withTiming(0, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.wrapper}>
        <BlurView intensity={26} tint="dark" style={styles.actionsCard}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Ações</Text>
            <Text style={styles.sectionSubtitle}>
              {isDaily ? "Modo diário ativo" : "Modo aleatório ativo"}
            </Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.row}>
              <ActionButton
                label="Guardar"
                icon="bookmark-outline"
                onPress={onSave}
              />
              <ActionButton
                label="Exportar"
                icon="share-social-outline"
                onPress={onShare}
              />
            </View>

            <View style={styles.row}>
              <ActionButton
                label="Favoritos"
                icon="heart-outline"
                onPress={onOpenFavorites}
              />
              <ActionButton
                label="Frase do dia"
                icon="sunny-outline"
                onPress={onDaily}
              />
            </View>

            <View style={styles.row}>
              <ActionButton
                label="Notificações"
                icon="notifications-outline"
                onPress={onEnableNotifications}
              />
              <ActionButton
                label={isDaily ? "Modo travado" : "Gerar outra"}
                icon={isDaily ? "lock-closed-outline" : "sparkles-outline"}
                onPress={onGenerate}
                variant="primary"
                disabled={isDaily}
              />
            </View>
          </View>
        </BlurView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  wrapper: {
    borderRadius: 26,
    overflow: "hidden",
  },
  actionsCard: {
    width: "100%",
    borderRadius: 26,
    padding: 16,
    backgroundColor: "rgba(10,10,12,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  headerRow: {
    marginBottom: 14,
    gap: 4,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontWeight: "600",
  },
  grid: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  buttonBase: {
    flex: 1,
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#ffffff",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.985 }],
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryIconWrap: {
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  secondaryIconWrap: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  buttonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: -0.2,
  },
  primaryText: {
    color: "#111111",
  },
  secondaryText: {
    color: "#ffffff",
  },
});
