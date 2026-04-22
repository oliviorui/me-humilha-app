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
          opacity: pressed ? 0.82 : 1,
        },
      ]}
      onPress={() => {
        void toggleTheme();
      }}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={20}
        color={palette.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
