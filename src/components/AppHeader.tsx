import { Image, StyleSheet, Text, View } from "react-native";
import ThemeToggle from "./ThemeToggle";
import { useAppTheme } from "../theme/ThemeProvider";

type AppHeaderProps = {
  title?: string;
};

export default function AppHeader({ title = "ME HUMILHA" }: AppHeaderProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />

        <Text style={[styles.title, { color: palette.text }]}>
          {title}
        </Text>
      </View>

      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flexShrink: 1,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
});
