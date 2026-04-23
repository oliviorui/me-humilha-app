import { Pressable, StyleSheet, Text, View } from "react-native";
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
        {
          opacity: disabled ? 0.6 : pressed ? 0.96 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      onPress={disabled ? undefined : onGenerate}
    >
      <LinearGradient
        colors={[palette.accent2, palette.accent3]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          {
            shadowColor: palette.accent2,
          },
        ]}
      >
        <View style={styles.shine} />

        <View style={styles.content}>
          <Ionicons
            name={disabled ? "reload-outline" : "sparkles-outline"}
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.text}>
            {disabled ? "A PENSAR..." : "NOVA HUMILHAÇÃO"}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 28,
    elevation: 6,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: -40,
    width: 120,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.10)",
    transform: [{ skewX: "-20deg" }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 21,
    letterSpacing: 3,
    color: "#FFFFFF",
  },
});
