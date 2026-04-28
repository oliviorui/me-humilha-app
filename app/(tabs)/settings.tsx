import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../src/components/AppHeader";
import { useAppTheme } from "../../src/theme/ThemeProvider";
import { useAppFonts } from "../../src/hooks/useAppFonts";
import ScreenBackground from "../../src/components/ScreenBackground";

export default function SettingsTab() {
  const { palette } = useAppTheme();
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.screen}>
          <AppHeader />

          <Text style={[styles.screenTitle, { color: palette.text }]}>
            DEFINIÇÕES
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
              Preferências
            </Text>

            <SettingsItem
              icon="notifications-outline"
              label="Notificações"
              badge="Em breve"
            />

            <SettingsItem
              icon="sunny-outline"
              label="Frase do dia"
              badge="Em breve"
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>
              Exportação
            </Text>

            <SettingsItem
              icon="image-outline"
              label="Formato de exportação"
              value="1:1 Feed"
            />
          </View>

          <Text style={[styles.footer, { color: palette.textMuted }]}>
            v1.0 · Feito com desamor
          </Text>
        </View>
      </SafeAreaView> 
    </ScreenBackground>
  );
}

type SettingsItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string;
  value?: string;
};

function SettingsItem({ icon, label, badge, value }: SettingsItemProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled
      style={[
        styles.item,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={[styles.itemIcon, { borderColor: palette.border }]}>
        <Ionicons name={icon} size={18} color={palette.textMuted} />
      </View>

      <Text style={[styles.itemLabel, { color: palette.text }]}>{label}</Text>

      {value ? (
        <Text style={[styles.itemValue, { color: palette.textMuted }]}>
          {value}
        </Text>
      ) : null}

      {badge ? (
        <View style={[styles.badge, { borderColor: palette.border }]}>
          <Text style={[styles.badgeText, { color: palette.textMuted }]}>
            {badge}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  screenTitle: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 16,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
    paddingLeft: 4,
  },
  item: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 8,
  },
  itemIcon: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemLabel: {
    flex: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
  },
  itemValue: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    letterSpacing: 1,
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    letterSpacing: 1,
  },
});
