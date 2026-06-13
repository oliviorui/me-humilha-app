import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import ScreenBackground from "../components/ScreenBackground";
import { setOnboardingSeen } from "../utils/appState";
import { useAppTheme } from "../theme/ThemeProvider";
import { useAppFonts } from "../hooks/useAppFonts";

export default function OnboardingScreen() {
  const { palette } = useAppTheme();
  const { fontsLoaded } = useAppFonts();

  async function handleContinue() {
    try {
      await setOnboardingSeen();
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Erro", "Não foi possível continuar agora.");
    }
  }

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <View style={styles.screen}>
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
          <View style={styles.brandRow}>
            <View
              style={[
                styles.logoMark,
                {
                  shadowColor: palette.accent2,
                },
              ]}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logoImage}
              />
            </View>

            <Text style={[styles.brandText, { color: palette.text }]}>
              ME HUMILHA
            </Text>
          </View>

          <Text style={[styles.title, { color: palette.text }]}>
            Bem-vindo.
          </Text>

          <Text style={[styles.description, { color: palette.text }]}>
            Aqui ninguém acredita no teu potencial.
          </Text>

          <Text style={[styles.secondary, { color: palette.textMuted }]}>
            Gera lapadas absurdas, guarda as piores e partilha a tua decadência com estilo.
          </Text>

          <View
            style={[
              styles.highlight,
              {
                backgroundColor: palette.surface2,
                borderColor: palette.border,
              },
            ]}
          >
            <Text style={[styles.highlightText, { color: palette.accent2 }]}>
              O app que te motiva no ódio.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.buttonWrap,
              {
                opacity: pressed ? 0.92 : 1,
                transform: [{ scale: pressed ? 0.985 : 1 }],
              },
            ]}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={[palette.accent2, palette.accent3]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>PODE COMEÇAR A HUMILHAÇÃO</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 22,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 4,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#c054e0",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 6,
  },
  logoImage: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },
  brandText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 22,
    letterSpacing: 2.5,
    lineHeight: 22,
  },
  title: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 10,
  },
  secondary: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  highlight: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 22,
  },
  highlightText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 14,
    lineHeight: 20,
  },
  buttonWrap: {
    width: "100%",
  },
  button: {
    minHeight: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonText: {
    fontFamily: "BebasNeue_400Regular",
    color: "#FFFFFF",
    fontSize: 21,
    letterSpacing: 2.5,
  },
});
