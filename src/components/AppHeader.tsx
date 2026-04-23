import { Image, StyleSheet, Text, View } from "react-native";
import ThemeToggle from "./ThemeToggle";
import { useAppTheme } from "../theme/ThemeProvider";

type AppHeaderProps = {
  title?: string;
};

export default function AppHeader({ title = "ME HUMILHA" }: AppHeaderProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.header}>
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
            resizeMode="cover"
          />
        </View>

        <Text style={[styles.logoText, { color: palette.text }]}>
          {title}
        </Text>
      </View>

      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 14,
    gap: 12,
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  logoMark: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#c054e0",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 6,
    flexShrink: 0,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 24,
    letterSpacing: 2.6,
    lineHeight: 24,
    flexShrink: 1,
  },
});
