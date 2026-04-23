import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { setOnboardingSeen } from "../utils/appState";
import { useAppTheme } from "../theme/ThemeProvider";

export default function OnboardingScreen() {
  const { palette, isDark } = useAppTheme();

  async function handleContinue() {
    try {
      await setOnboardingSeen();
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Erro", "Não foi possível continuar agora.");
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View
        style={[
          styles.glowTop,
          {
            backgroundColor: palette.primary,
            opacity: isDark ? 0.14 : 0.10,
          },
        ]}
      />

      <View
        style={[
          styles.glowBottom,
          {
            backgroundColor: palette.accent2,
            opacity: isDark ? 0.14 : 0.10,
          },
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
          <LinearGradient
            colors={[palette.primary, palette.primaryStrong, palette.accent2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.brandChip}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.brandChipText}>ME HUMILHA</Text>
          </LinearGradient>
        </View>

        <Text style={[styles.title, { color: palette.text }]}>
          Bem-vindo.
        </Text>

        <Text style={[styles.description, { color: palette.text }]}>
          Aqui ninguém acredita no teu potencial.
        </Text>

        <Text style={[styles.descriptionSecondary, { color: palette.textMuted }]}>
          Gera lapadas absurdas, guarda as piores e partilha posters da tua decadência com estilo.
        </Text>

        <View
          style={[
            styles.highlightBox,
            {
              backgroundColor: palette.surfaceSoft,
              borderColor: palette.border,
            },
          ]}
        >
          <Text style={[styles.highlightText, { color: palette.primaryStrong }]}>
            O app que te motiva no ódio.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.buttonWrap,
            { opacity: pressed ? 0.88 : 1 },
          ]}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={[palette.primary, palette.primaryStrong, palette.accent2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <Text style={[styles.buttonText, { color: palette.primaryText }]}>
              Pode começar a humilhação
            </Text>
          </LinearGradient>
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
    borderRadius: 30,
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 4,
  },
  topRow: {
    marginBottom: 20,
  },
  brandChip: {
    minHeight: 54,
    alignSelf: "flex-start",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  brandChipText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 12,
  },
  description: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 10,
  },
  descriptionSecondary: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 24,
  },
  highlightBox: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 24,
  },
  highlightText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
  },
  buttonWrap: {
    width: "100%",
  },
  button: {
    minHeight: 62,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
