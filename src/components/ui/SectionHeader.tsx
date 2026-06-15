import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../theme/ThemeProvider";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  meta?: string;
};

export default function SectionHeader({ title, subtitle, meta }: SectionHeaderProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: palette.textMuted }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {meta ? (
        <View
          style={[
            styles.metaPill,
            { backgroundColor: palette.surface2, borderColor: palette.border },
          ]}
        >
          <Text style={[styles.meta, { color: palette.textMuted }]}>{meta}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 30,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 3,
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 12,
    lineHeight: 17,
    opacity: 0.75,
  },
  metaPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 1,
  },
  meta: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 11,
  },
});
