import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "../../src/theme/ThemeProvider";
import { useAppFonts } from "../../src/hooks/useAppFonts";
import ScreenBackground from "../../src/components/ScreenBackground";
import { Card, LoadingScreen, SectionHeader } from "../../src/components/ui";

export default function SettingsTab() {
  const { palette } = useAppTheme();
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.screen}>

          <SectionHeader
            title="Definições"
          />

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>Geral</Text>

            <SettingsItem icon="color-palette-outline" label="Tema" value="Ativo" />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>Sistema</Text>

            <SettingsItem icon="phone-portrait-outline" label="Versão" value="v1.0" />
            <SettingsItem icon="shield-checkmark-outline" label="Estado" value="Pronto" />
          </View>

          <Text style={[styles.footer, { color: palette.textMuted }]}>Feito com desamor · Olívio Cumbe</Text>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

type SettingsItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
};

function SettingsItem({ icon, label, value }: SettingsItemProps) {
  const { palette } = useAppTheme();

  return (
    <Card style={styles.itemCard} contentStyle={styles.item} accessibilityLabel={`${label}${value ? `, ${value}` : ""}`}>
      <View style={[styles.itemIcon, { backgroundColor: palette.surface2, borderColor: palette.border }]}> 
        <Ionicons name={icon} size={18} color={palette.accent2} />
      </View>

      <Text style={[styles.itemLabel, { color: palette.text }]}>{label}</Text>

      {value ? (
        <View style={[styles.valuePill, { backgroundColor: palette.surface2, borderColor: palette.border }]}> 
          <Text style={[styles.itemValue, { color: palette.textMuted }]}>{value}</Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },
  statusCard: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 22,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statusTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  statusTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 15,
    marginBottom: 3,
  },
  statusSub: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    opacity: 0.72,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
    paddingLeft: 4,
  },
  itemCard: {
    marginBottom: 10,
    borderRadius: 18,
  },
  item: {
    paddingVertical: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemLabel: {
    flex: 1,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 14,
  },
  valuePill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 0,
  },
  itemValue: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 11,
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 108,
    textAlign: "center",
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    letterSpacing: 0.6,
    opacity: 0.66,
  },
});
