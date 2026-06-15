import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../theme/ThemeProvider";
import AppButton from "./AppButton";
import Card from "./Card";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  onAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
}: EmptyStateProps) {
  const { palette } = useAppTheme();

  return (
    <Card elevated contentStyle={styles.cardContent} accessibilityLabel={title}>
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: palette.glow,
            borderColor: palette.border,
          },
        ]}
      >
        <Ionicons name={icon} size={25} color={palette.accent2} />
      </View>

      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      <Text style={[styles.description, { color: palette.textMuted }]}>
        {description}
      </Text>

      {actionLabel && onAction ? (
        <AppButton
          label={actionLabel}
          icon={actionIcon}
          onPress={onAction}
          size="md"
          variant="secondary"
          accessibilityHint="Volta para a tela inicial para gerar uma nova frase."
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 22,
    paddingVertical: 34,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: -0.2,
  },
  description: {
    fontFamily: "PlusJakartaSans_400Regular",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 300,
    opacity: 0.76,
    marginBottom: 8,
  },
});
