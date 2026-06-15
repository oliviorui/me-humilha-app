import { ActivityIndicator, StyleSheet, View } from "react-native";

import ScreenBackground from "../ScreenBackground";
import { useAppTheme } from "../../theme/ThemeProvider";

export default function LoadingScreen() {
  const { palette } = useAppTheme();

  return (
    <ScreenBackground>
      <View style={styles.center} accessibilityRole="progressbar">
        <ActivityIndicator color={palette.accent2} />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
