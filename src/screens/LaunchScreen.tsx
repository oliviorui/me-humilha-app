import { Image, StyleSheet, Text, View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";
import { useAppTheme } from "../theme/ThemeProvider";
import { useAppFonts } from "../hooks/useAppFonts";

export default function LaunchScreen() {
  const { palette } = useAppTheme();
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <View style={styles.screen}>
        <View style={styles.logoArea}>
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

          <Text style={[styles.logoText, { color: palette.text }]}>
            ME HUMILHA
          </Text>
        </View>

        <Text style={[styles.subtitle, { color: palette.textMuted }]}>
          carregando sua próxima decepção...
        </Text>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#c054e0",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 6,
  },
  logoImage: {
    width: 24,
    height: 24,
    borderRadius: 7,
  },
  logoText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 28,
    letterSpacing: 3,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    textAlign: "center",
  },
});
