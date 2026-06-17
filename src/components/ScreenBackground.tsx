import { memo, ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type ScreenBackgroundProps = {
  children?: ReactNode;
};

function ScreenBackground({
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
        {noiseDots.map((dotStyle, index) => (
          <View
            key={index}
            style={[styles.noiseDot, dotStyle, { backgroundColor: palette.text }]}
          />
        ))}
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

export default memo(ScreenBackground);

const noiseDots: ViewStyle[] = [
  { top: "8%", left: "14%" },
  { top: "14%", left: "72%" },
  { top: "22%", left: "44%" },
  { top: "31%", left: "87%" },
  { top: "39%", left: "19%" },
  { top: "47%", left: "63%" },
  { top: "55%", left: "8%" },
  { top: "61%", left: "78%" },
  { top: "71%", left: "29%" },
  { top: "79%", left: "58%" },
  { top: "86%", left: "90%" },
  { top: "92%", left: "12%" },
];

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
  content: {
    flex: 1,
  },
});
