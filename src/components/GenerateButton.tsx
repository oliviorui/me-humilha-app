import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
        styles.button,
        {
          backgroundColor: disabled ? palette.surfaceMuted : palette.primary,
          opacity: pressed ? 0.85 : disabled ? 0.55 : 1,
        },
      ]}
      onPress={disabled ? undefined : onGenerate}
    >
      <Ionicons
        name={disabled ? "lock-closed-outline" : "sparkles-outline"}
        size={20}
        color={disabled ? palette.textMuted : palette.primaryText}
      />

      <Text
        style={[
          styles.text,
          {
            color: disabled ? palette.textMuted : palette.primaryText,
          },
        ]}
      >
        {disabled ? "Modo travado" : "Gerar nova"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 60,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: -0.3,
  },
});
