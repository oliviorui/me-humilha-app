import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type ScreenBackgroundProps = {
  children?: ReactNode;
};

export default function ScreenBackground({
  children,
}: ScreenBackgroundProps) {
  const { palette } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: palette.bg }]}>
      <View
        style={[
          styles.topGlow,
          {
            backgroundColor: palette.accent3,
          },
        ]}
      />

      <View
        style={[
          styles.bottomGlow,
          {
            backgroundColor: palette.accent2,
          },
        ]}
      />

      <View style={styles.noiseLayer}>
        <View style={[styles.noiseDot, styles.dot1, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot2, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot3, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot4, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot5, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot6, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot7, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot8, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot9, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot10, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot11, { backgroundColor: palette.text }]} />
        <View style={[styles.noiseDot, styles.dot12, { backgroundColor: palette.text }]} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  topGlow: {
    position: "absolute",
    top: -150,
    left: "18%",
    right: "18%",
    height: 300,
    borderRadius: 999,
    opacity: 0.14,
  },
  bottomGlow: {
    position: "absolute",
    bottom: -140,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 999,
    opacity: 0.06,
  },
  noiseLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.02,
  },
  noiseDot: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 999,
  },
  dot1: { top: "8%", left: "14%" },
  dot2: { top: "14%", left: "72%" },
  dot3: { top: "22%", left: "44%" },
  dot4: { top: "31%", left: "87%" },
  dot5: { top: "39%", left: "19%" },
  dot6: { top: "47%", left: "63%" },
  dot7: { top: "55%", left: "8%" },
  dot8: { top: "61%", left: "78%" },
  dot9: { top: "71%", left: "29%" },
  dot10: { top: "79%", left: "58%" },
  dot11: { top: "86%", left: "90%" },
  dot12: { top: "92%", left: "12%" },
  content: {
    flex: 1,
  },
});
