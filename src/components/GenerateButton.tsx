import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeProvider";

type GenerateButtonProps = {
  onGenerate: () => void;
  disabled?: boolean;
};

export default function GenerateButton({
  onGenerate,
  disabled = false,
}: GenerateButtonProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        { opacity: pressed ? 0.88 : disabled ? 0.55 : 1 },
      ]}
      onPress={disabled ? undefined : onGenerate}
    >
      <LinearGradient
        colors={[palette.primary, palette.primaryStrong, palette.accent2]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Ionicons
          name={disabled ? "lock-closed-outline" : "sparkles-outline"}
          size={20}
          color={palette.primaryText}
        />

        <Text style={[styles.text, { color: palette.primaryText }]}>
          {disabled ? "Modo travado" : "NOVA HUMILHAÇÃO"}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  button: {
    minHeight: 84,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
