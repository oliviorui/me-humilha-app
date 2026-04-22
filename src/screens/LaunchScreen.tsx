import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

export default function LaunchScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <BlurView intensity={18} tint="dark" style={styles.card}>
        <Text style={styles.brand}>Me Humilha</Text>
        <Text style={styles.tagline}>carregando sua próxima decepção...</Text>
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
    paddingHorizontal: 24,
  },
  glowTop: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -50,
    right: -50,
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
    backgroundColor: "rgba(18,18,24,0.88)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    alignItems: "center",
  },
  brand: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 10,
  },
  tagline: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
    textAlign: "center",
  },
});
