import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../theme/ThemeProvider";

export default function ThemeToggle() {
  const { isDark, palette, toggleTheme } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          opacity: pressed ? 0.86 : 1,
        },
      ]}
      onPress={() => {
        void toggleTheme();
      }}
      accessibilityLabel="Alternar tema"
    >
      <Ionicons
        name={isDark ? "moon-outline" : "sunny-outline"}
        size={18}
        color={palette.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
