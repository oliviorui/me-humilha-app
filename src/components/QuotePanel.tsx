import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../theme/ThemeProvider";

type QuotePanelProps = {
  quote: string;
  image: number;
  onFavorite: () => void;
  onSave: () => void;
  onShare: () => void;
};

export default function QuotePanel({
  quote,
  image,
  onFavorite,
  onSave,
  onShare,
}: QuotePanelProps) {
  const { palette } = useAppTheme();

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
      style={[
        styles.card,
        {
          borderColor: palette.border,
          backgroundColor: palette.card,
          shadowColor: palette.shadow,
        },
      ]}
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: palette.overlay,
          },
        ]}
      />

      <View
        style={[
          styles.cornerTop,
          { backgroundColor: palette.primary },
        ]}
      />
      <View
        style={[
          styles.cornerBottom,
          { backgroundColor: palette.accent },
        ]}
      />

      <View
        style={[
          styles.tag,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: palette.primary },
          ]}
        />
        <Text style={[styles.tagText, { color: palette.textMuted }]}>
          DESMOTIVAÇÃO DO DIA
        </Text>
      </View>

      <Text style={[styles.quoteMark, { color: palette.primary }]}>”</Text>

      <Text style={[styles.quote, { color: palette.text }]}>
        {quote}
      </Text>

      <View
        style={[
          styles.separator,
          { backgroundColor: palette.border },
        ]}
      />

      <View style={styles.actions}>
        <ActionButton
          icon="heart-outline"
          label="Favorito"
          onPress={onFavorite}
        />
        <ActionButton
          icon="bookmark-outline"
          label="Guardar"
          onPress={onSave}
        />
        <ActionButton
          icon="share-social-outline"
          label="Partilhar"
          onPress={onShare}
        />
      </View>
    </ImageBackground>
  );
}

type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor: palette.surfaceSoft,
          borderColor: palette.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={palette.textMuted} />
      <Text style={[styles.actionLabel, { color: palette.textMuted }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 34,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
    minHeight: 470,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
    position: "relative",
  },
  imageStyle: {
    opacity: 0.16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cornerTop: {
    position: "absolute",
    top: 28,
    left: 0,
    width: 72,
    height: 3,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  cornerBottom: {
    position: "absolute",
    right: 0,
    bottom: 34,
    width: 72,
    height: 3,
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
  },
  tag: {
    alignSelf: "flex-start",
    minHeight: 38,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    marginLeft: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
  },
  quoteMark: {
    fontSize: 60,
    fontWeight: "900",
    lineHeight: 60,
    marginTop: 24,
    marginLeft: 12,
  },
  quote: {
    fontSize: 34,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginTop: 10,
    marginHorizontal: 12,
    minHeight: 210,
  },
  separator: {
    height: 1,
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
  },
  actionButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
});
