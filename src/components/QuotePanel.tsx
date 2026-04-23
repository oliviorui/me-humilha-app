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
  isLiked?: boolean;
  isAnimating?: boolean;
};

type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLiked?: boolean;
};

function ActionButton({
  icon,
  label,
  onPress,
  isLiked = false,
}: ActionButtonProps) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.actionBtn,
        {
          backgroundColor: isLiked ? "rgba(192,84,224,0.12)" : palette.surface2,
          borderColor: isLiked ? palette.accent2 : palette.border,
          opacity: pressed ? 0.86 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={14}
        color={isLiked ? palette.accent2 : palette.textMuted}
      />
      <Text
        style={[
          styles.actionText,
          { color: isLiked ? palette.accent2 : palette.textMuted },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function QuotePanel({
  quote,
  image,
  onFavorite,
  onSave,
  onShare,
  isLiked = false,
  isAnimating = false,
}: QuotePanelProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={styles.bgImage}
        style={[
          styles.card,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            shadowColor: palette.shadow,
            opacity: isAnimating ? 0 : 1,
            transform: [
              { translateY: isAnimating ? 14 : 0 },
              { scale: isAnimating ? 0.96 : 1 },
            ],
          },
        ]}
      >
        <View style={styles.imageTone} />
        <View style={styles.imageBottomShade} />

        <View
          style={[
            styles.cornerTop,
            {
              borderTopColor: palette.accent2,
              borderLeftColor: palette.accent2,
            },
          ]}
        />

        <View
          style={[
            styles.cornerBottom,
            {
              borderBottomColor: palette.accent,
              borderRightColor: palette.accent,
            },
          ]}
        />

        <View style={styles.inner}>
          <View style={styles.topContent}>
            <View
              style={[
                styles.eyebrow,
                {
                  borderColor: "rgba(192,84,224,0.35)",
                  backgroundColor: "rgba(17,12,26,0.42)",
                },
              ]}
            >
              <View
                style={[
                  styles.eyebrowDot,
                  {
                    backgroundColor: palette.accent2,
                    shadowColor: palette.accent2,
                  },
                ]}
              />
              <Text style={[styles.eyebrowText, { color: palette.textSoft }]}>
                Desmotivação do dia
              </Text>
            </View>

            <Text style={[styles.quoteMark, { color: palette.accent2 }]}>”</Text>

            <View style={styles.phraseWrap}>
              <Text style={[styles.phrase, { color: palette.text }]}>
                {quote}
              </Text>
            </View>
          </View>

          <View style={styles.bottomBlock}>
            <View
              style={[
                styles.divider,
                { backgroundColor: palette.border },
              ]}
            />

            <View style={styles.actions}>
              <ActionButton
                icon="heart-outline"
                label="Favorito"
                onPress={onFavorite}
                isLiked={isLiked}
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
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 16,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    minHeight: 520,
    borderWidth: 1,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 48,
    elevation: 4,
  },
  bgImage: {
    opacity: 0.40,
  },
  imageTone: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13,10,18,0.24)",
  },
  imageBottomShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "33%",
    backgroundColor: "rgba(13,10,18,0.42)",
  },
  cornerTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 56,
    height: 56,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 24,
    opacity: 0.85,
    zIndex: 3,
  },
  cornerBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 56,
    height: 56,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 24,
    opacity: 0.7,
    zIndex: 3,
  },
  inner: {
    flex: 1,
    paddingTop: 34,
    paddingRight: 26,
    paddingBottom: 24,
    paddingLeft: 26,
    justifyContent: "space-between",
  },
  topContent: {
    flex: 1,
  },
  eyebrow: {
    alignSelf: "flex-start",
    minHeight: 30,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 26,
  },
  eyebrowDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  eyebrowText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    letterSpacing: 2.8,
    textTransform: "uppercase",
  },
  quoteMark: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 66,
    lineHeight: 38,
    marginBottom: 18,
    opacity: 0.95,
  },
  phraseWrap: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 22,
  },
  phrase: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 38,
    lineHeight: 40,
    letterSpacing: 0.5,
    maxWidth: "90%",
  },
  bottomBlock: {
    marginTop: 14,
  },
  divider: {
    height: 1,
    marginBottom: 18,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
