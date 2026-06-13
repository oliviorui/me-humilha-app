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
        colors={[palette.accent2, palette.accent3, palette.accent2]}
        start={{ x: 0, y: 0 }}
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
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.text}>
            {disabled ? "A pensar..." : "Nova humilhação"}
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
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 24,
    elevation: 6,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: -35,
    width: 105,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.14)",
    transform: [{ skewX: "-20deg" }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  text: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 15.5,
    letterSpacing: 0.2,
    color: "#FFFFFF",
  },
});
