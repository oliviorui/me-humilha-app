import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeProvider";

export default function LaunchScreen() {
  const { palette, isDark } = useAppTheme();

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
        <LinearGradient
          colors={[palette.primary, palette.primaryStrong, palette.accent2]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.logoWrap}
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          />
        </LinearGradient>

        <Text style={[styles.brand, { color: palette.text }]}>
          ME HUMILHA
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
    borderRadius: 30,
    paddingVertical: 34,
    paddingHorizontal: 24,
    borderWidth: 1,
    alignItems: "center",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 4,
  },
  logoWrap: {
    width: 94,
    height: 94,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
    textAlign: "center",
  },
});
