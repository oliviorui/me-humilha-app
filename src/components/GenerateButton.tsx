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
    borderRadius: 999,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
});
