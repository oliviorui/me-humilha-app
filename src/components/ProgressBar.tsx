import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeProvider";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

export default function ProgressBar({
  progress,
  percentage,
  year,
}: ProgressBarProps) {
  const { palette } = useAppTheme();
  const progressWidth: `${number}%` = `${Math.max(progress * 100, 2)}%`;

  return (
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
      <View style={styles.row}>
        <Text style={[styles.label, { color: palette.textMuted }]}>
          FIM DE {year}
        </Text>

        <Text style={[styles.value, { color: palette.primaryStrong }]}>
          {percentage.toFixed(2)}%
        </Text>
      </View>

      <View
        style={[
          styles.track,
          {
            backgroundColor: palette.surfaceSoft,
          },
        ]}
      >
        <LinearGradient
          colors={[palette.primary, palette.accent2, palette.accent]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.fill,
            {
              width: progressWidth,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 18,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
  },
  value: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  track: {
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
