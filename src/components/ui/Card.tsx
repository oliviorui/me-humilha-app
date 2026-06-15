import { type PropsWithChildren } from "react";
import { StyleSheet, View, type ViewStyle, type StyleProp } from "react-native";

import { useAppTheme } from "../../theme/ThemeProvider";

type CardVariant = "default" | "soft";

type CardProps = PropsWithChildren<{
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  elevated?: boolean;
  accessibilityLabel?: string;
}>;

export default function Card({
  children,
  variant = "default",
  style,
  contentStyle,
  elevated = false,
  accessibilityLabel,
}: CardProps) {
  const { palette } = useAppTheme();

  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.card,
        {
          backgroundColor:
            variant === "soft" ? palette.surface2 : palette.surface,
          borderColor: palette.border,
          shadowColor: palette.shadow,
        },
        elevated ? styles.elevated : null,
        style,
      ]}
    >
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 22,
    overflow: "hidden",
  },
  elevated: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 3,
  },
});
