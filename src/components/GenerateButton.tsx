import { StyleSheet, View } from "react-native";

import { AppButton } from "./ui";
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
    <View style={[styles.wrapper, { shadowColor: palette.accent2 }]}> 
      <View style={styles.shine} pointerEvents="none" />
      <AppButton
        label={disabled ? "A pensar..." : "Nova humilhação"}
        icon={disabled ? "reload-outline" : "sparkles-outline"}
        onPress={onGenerate}
        disabled={disabled}
        variant="primary"
        size="lg"
        fullWidth
        accessibilityLabel="Gerar nova humilhação"
        accessibilityHint="Mostra uma nova frase com uma nova imagem."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: 18,
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
    zIndex: 2,
  },
});
