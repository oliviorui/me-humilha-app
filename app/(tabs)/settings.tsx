import { StyleSheet, Text, View } from "react-native";
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
          <AppHeader subtitle="controlo mínimo para caos máximo" />

          <Text style={[styles.screenTitle, { color: palette.text }]}>DEFINIÇÕES</Text>
          <Text style={[styles.screenSub, { color: palette.textMuted }]}>Tudo pronto para a primeira versão pública.</Text>

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: palette.surface,
                borderColor: palette.border,
                shadowColor: palette.shadow,
              },
            ]}
          >
            <View style={[styles.statusIcon, { backgroundColor: palette.glow }]}> 
              <Ionicons name="rocket-outline" size={20} color={palette.accent2} />
            </View>

            <View style={styles.statusTextWrap}>
              <Text style={[styles.statusTitle, { color: palette.text }]}>MVP limpo e direto</Text>
              <Text style={[styles.statusSub, { color: palette.textMuted }]}>Sem botões mortos, com partilha 1:1 e tema claro/escuro ativo.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>Experiência</Text>

            <SettingsItem icon="image-outline" label="Arte de partilha" value="Formato 1:1" />
            <SettingsItem icon="color-palette-outline" label="Tema visual" value="Botão no topo" />
            <SettingsItem icon="bookmark-outline" label="Frases guardadas" value="Offline" />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: palette.textMuted }]}>Versão</Text>

            <SettingsItem icon="phone-portrait-outline" label="Aplicação" value="v1.0" />
          </View>

          <Text style={[styles.footer, { color: palette.textMuted }]}>Feito com desamor · pronto para ser testado</Text>
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
    <View
      style={[
        styles.item,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={[styles.itemIcon, { backgroundColor: palette.surface2, borderColor: palette.border }]}> 
        <Ionicons name={icon} size={18} color={palette.accent2} />
      </View>

      <Text style={[styles.itemLabel, { color: palette.text }]}>{label}</Text>

      {value ? (
        <View style={[styles.valuePill, { backgroundColor: palette.surface2, borderColor: palette.border }]}> 
          <Text style={[styles.itemValue, { color: palette.textMuted }]}>{value}</Text>
        </View>
      ) : null}
    </View>
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
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 32,
    letterSpacing: 2,
    lineHeight: 34,
  },
  screenSub: {
    marginTop: 2,
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    opacity: 0.72,
  },
  statusCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 22,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 3,
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
  item: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
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
