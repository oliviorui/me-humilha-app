import { Image, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

export default function LaunchScreen() {
  const { palette } = useAppTheme();

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
        <View
          style={[
            styles.logoWrap,
            { backgroundColor: palette.surfaceStrong },
          ]}
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
        </View>

        <Text style={[styles.brand, { color: palette.text }]}>
          Me Humilha
        </Text>

        <Text style={[styles.tagline, { color: palette.textMuted }]}>
          carregando sua próxima decepção...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  },
  glowBottom: {
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 999,
  },
  card: {
    width: "100%",
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 4,
  },
  logoWrap: {
    width: 82,
    height: 82,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
  },
  brand: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
    textAlign: "center",
  },
});
