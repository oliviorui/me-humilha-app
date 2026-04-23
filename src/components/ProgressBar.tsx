import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeProvider";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

const yearMessages: string[] = [
  "o ano está acabando e olha vc aí, fazendo nada mesmo.",
  "o tempo tá passando e tu continuas em modo decorativo.",
  "mais um ano indo embora e tua grande virada ainda em rascunho.",
  "o calendário anda. tu ensaias.",
  "o ano quase fecha e o caos continua em dia.",
];

function getYearMessage(progress: number): string {
  const index = Math.min(
    yearMessages.length - 1,
    Math.floor(progress * yearMessages.length)
  );

  return yearMessages[index];
}

export default function ProgressBar({
  progress,
  percentage,
  year,
}: ProgressBarProps) {
  const { palette } = useAppTheme();

  const progressWidth: `${number}%` = `${Math.max(progress * 100, 2)}%`;
  const message = getYearMessage(progress);

  return (
    <View
      style={[
        styles.yearBar,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.yearLabel, { color: palette.textMuted }]}>
          FIM DE {year}
        </Text>

        <Text style={[styles.yearPct, { color: palette.accent2 }]}>
          {percentage.toFixed(2)}%
        </Text>
      </View>

      <View
        style={[
          styles.yearTrack,
          { backgroundColor: palette.progressBg },
        ]}
      >
        <LinearGradient
          colors={[palette.accent2, palette.accent3, palette.accent]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.yearFill,
            {
              width: progressWidth,
              shadowColor: palette.accent2,
            },
          ]}
        />
      </View>

      <Text style={[styles.helperText, { color: palette.textMuted }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yearBar: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 9,
  },
  yearLabel: {
    flex: 1,
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
  yearPct: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 26,
    letterSpacing: 1,
    lineHeight: 26,
    flexShrink: 0,
  },
  yearTrack: {
    height: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  yearFill: {
    height: "100%",
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  helperText: {
    marginTop: 10,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
  },
});
