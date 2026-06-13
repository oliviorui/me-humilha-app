import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/ThemeProvider";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

const yearMessages: string[] = [
  "Ainda dá tempo de parar de fingir que há um plano.",
  "O calendário avançou. Tu ainda estás no modo rascunho.",
  "Metade do ano quase foi. A grande virada ficou em reunião.",
  "O ano está a correr. Tu estás a negociar com a preguiça.",
  "Reta final: agora ou mais uma desculpa premium.",
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
          shadowColor: palette.shadow,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text style={[styles.yearLabel, { color: palette.textMuted }]}>PROGRESSO DO ANO</Text>
          <Text style={[styles.yearTitle, { color: palette.text }]}>{year} está a escapar</Text>
        </View>

        <View style={[styles.pill, { backgroundColor: palette.surface2, borderColor: palette.border }]}>
          <Text style={[styles.yearPct, { color: palette.accent2 }]}> {percentage.toFixed(1)}% </Text>
        </View>
      </View>

      <View style={[styles.yearTrack, { backgroundColor: palette.progressBg }]}> 
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

      <Text style={[styles.helperText, { color: palette.textMuted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yearBar: {
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  yearLabel: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 9,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  yearTitle: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 18,
    letterSpacing: -0.4,
    lineHeight: 23,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexShrink: 0,
  },
  yearPct: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  yearTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  yearFill: {
    height: "100%",
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 9,
  },
  helperText: {
    marginTop: 10,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12.5,
    lineHeight: 18,
    opacity: 0.82,
  },
});
