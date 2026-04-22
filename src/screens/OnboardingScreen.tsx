import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import { setOnboardingSeen } from "../utils/appState";

export default function OnboardingScreen() {
  async function handleContinue() {
    try {
      await setOnboardingSeen();
      router.replace("/home");
    } catch {
      Alert.alert("Erro", "Não foi possível continuar agora.");
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <BlurView intensity={18} tint="dark" style={styles.card}>
        <Text style={styles.brand}>Me Humilha</Text>

        <Text style={styles.title}>Bem-vindo.</Text>

        <Text style={styles.description}>
          Aqui ninguém acredita no teu potencial.
        </Text>

        <Text style={styles.descriptionSecondary}>
          Gera lapadas, guarda as piores e exporta posters da tua decadência com estilo.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Pode começar a humilhação</Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A0A0F",
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
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -60,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  card: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: "rgba(18,18,24,0.90)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  brand: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 18,
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 12,
  },
  description: {
    color: "#ffffff",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  descriptionSecondary: {
    color: "rgba(255,255,255,0.70)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 26,
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  buttonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: -0.3,
    textAlign: "center",
  },
});
