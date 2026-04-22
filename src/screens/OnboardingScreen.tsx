import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { setOnboardingSeen } from "../utils/appState";
import { useAppTheme } from "../theme/ThemeProvider";

export default function OnboardingScreen() {
  const { palette } = useAppTheme();

  async function handleContinue() {
    try {
      await setOnboardingSeen();
      router.replace("/home");
    } catch {
      Alert.alert("Erro", "Não foi possível continuar agora.");
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View
        style={[
          styles.glowTop,
          { backgroundColor: palette.accent, opacity: 0.12 },
        ]}
      />
      <View
        style={[
          styles.glowBottom,
          { backgroundColor: palette.primary, opacity: 0.12 },
        ]}
      />

      <View
        style={[
          styles.card,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            shadowColor: palette.shadow,
          },
        ]}
      >
        <View style={styles.topRow}>
          <View
            style={[
              styles.brandChip,
              {
                backgroundColor: palette.surfaceStrong,
                borderColor: palette.border,
              },
            ]}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={[styles.brandChipText, { color: palette.text }]}>
              Me Humilha
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: palette.text }]}>Bem-vindo.</Text>

        <Text style={[styles.description, { color: palette.text }]}>
          Aqui ninguém acredita no teu potencial.
        </Text>

        <Text
          style={[styles.descriptionSecondary, { color: palette.textMuted }]}
        >
          Gera lapadas, guarda as piores e exporta posters da tua decadência com estilo.
        </Text>

        <View
          style={[
            styles.highlightBox,
            {
              backgroundColor: palette.surfaceStrong,
              borderColor: palette.border,
            },
          ]}
        >
          <Text style={[styles.highlightText, { color: palette.textSoft }]}>
            O app que te motiva no ódio.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: palette.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, { color: palette.primaryText }]}>
            Pode começar a humilhação
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  glowTop: {
    position: "absolute",
    top: -50,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
  },
  glowBottom: {
    position: "absolute",
    bottom: -60,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 999,
  },
  card: {
    width: "100%",
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 4,
  },
  topRow: {
    marginBottom: 18,
  },
  brandChip: {
    minHeight: 46,
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  brandChipText: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 12,
  },
  description: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  descriptionSecondary: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 22,
  },
  highlightBox: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: -0.3,
    textAlign: "center",
  },
});
