import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../src/components/AppHeader";
import ProgressBar from "../../src/components/ProgressBar";
import { useAppTheme } from "../../src/theme/ThemeProvider";
import { getYearProgress } from "../../src/utils/getYearProgress";

export default function SettingsTab() {
  const { palette } = useAppTheme();
  const yearProgress = getYearProgress();

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <AppHeader />

      <ProgressBar
        progress={yearProgress.progress}
        percentage={yearProgress.percentage}
        year={yearProgress.year}
      />

      <Text style={[styles.title, { color: palette.text }]}>DEFINIÇÕES</Text>

      <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
        PREFERÊNCIAS
      </Text>

      <SettingsRow
        icon="notifications-outline"
        label="Notificações"
        value="Em breve"
      />

      <SettingsRow
        icon="sunny-outline"
        label="Frase do dia"
        value="Em breve"
      />

      <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
        EXPORTAÇÃO
      </Text>

      <SettingsRow
        icon="image-outline"
        label="Formato de exportação"
        value="1:1 Feed"
      />

      <Text style={[styles.footer, { color: palette.textMuted }]}>
        v1.0 · Feito com desamor
      </Text>
    </View>
  );
}

type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function SettingsRow({ icon, label, value }: SettingsRowProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.row,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: palette.surfaceSoft },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={palette.primary}
        />
      </View>

      <Text style={[styles.rowLabel, { color: palette.text }]}>
        {label}
      </Text>

      <View
        style={[
          styles.pill,
          { backgroundColor: palette.surfaceSoft },
        ]}
      >
        <Text style={[styles.rowValue, { color: palette.primaryStrong }]}>
          {value}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 12,
    marginTop: 10,
  },
  row: {
    minHeight: 112,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 14,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
  },
  pill: {
    minHeight: 38,
    borderRadius: 999,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
});
