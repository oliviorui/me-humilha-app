import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useAppTheme } from "../../theme/ThemeProvider";

type AppButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type AppButtonSize = "sm" | "md" | "lg";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export default function AppButton({
  label,
  onPress,
  icon,
  variant = "secondary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}: AppButtonProps) {
  const { palette } = useAppTheme();
  const isInactive = disabled || loading;
  const isPrimary = variant === "primary";

  const content = (
    <>
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? "#FFFFFF" : palette.text} />
      ) : icon ? (
        <Ionicons
          name={icon}
          size={size === "lg" ? 19 : size === "sm" ? 14 : 16}
          color={
            isPrimary
              ? "#FFFFFF"
              : variant === "danger"
                ? palette.danger
                : palette.accent2
          }
        />
      ) : null}

      <Text
        style={[
          styles.label,
          styles[`${size}Label`],
          {
            color: isPrimary
              ? "#FFFFFF"
              : variant === "danger"
                ? palette.danger
                : palette.text,
          },
        ]}
        numberOfLines={1}
      >
        {loading ? "A carregar..." : label}
      </Text>
    </>
  );

  return (
    <Pressable
      onPress={isInactive ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: loading }}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        fullWidth ? styles.fullWidth : null,
        {
          borderColor: variant === "ghost" ? "transparent" : palette.border,
          backgroundColor:
            variant === "ghost" ? "transparent" : palette.surface2,
          opacity: isInactive ? 0.58 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed && !isInactive ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={[palette.accent2, palette.accent3, palette.accent2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, styles[size]]}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
  },
  sm: {
    minHeight: 36,
    paddingHorizontal: 12,
  },
  md: {
    minHeight: 42,
    paddingHorizontal: 16,
  },
  lg: {
    minHeight: 56,
    paddingHorizontal: 20,
  },
  gradient: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  label: {
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 0.1,
  },
  smLabel: {
    fontSize: 11.5,
  },
  mdLabel: {
    fontSize: 13,
  },
  lgLabel: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 15.5,
  },
});
