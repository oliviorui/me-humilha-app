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
      accessibilityRole="button"
      accessibilityLabel={label}
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
        numberOfLines={1}
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
      <View
        style={[
          styles.cardShell,
          {
            opacity: isAnimating ? 0 : 1,
            transform: [
              { translateY: isAnimating ? 14 : 0 },
              { scale: isAnimating ? 0.96 : 1 },
            ],
          },
        ]}
      >
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

              <Text style={[styles.quoteMark, { color: palette.accent2 }]}>
                ”
              </Text>

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
                  {
                    backgroundColor: palette.border,
                  },
                ]}
              />

              <View style={styles.actions}>
                <ActionButton
                  icon={isLiked ? "heart" : "heart-outline"}
                  label="Curtir"
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 10,
    justifyContent: "center",
  },
  cardShell: {
    width: "100%",
  },
  card: {
    width: "100%",
    minHeight: 390,
    borderWidth: 1,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 34,
    elevation: 4,
  },
  bgImage: {
    borderRadius: 22,
    opacity: 0.5,
  },
  imageTone: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13,10,18,0.14)",
  },
  imageBottomShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: "rgba(13,10,18,0.46)",
  },
  cornerTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 46,
    height: 46,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopLeftRadius: 22,
    opacity: 0.85,
    zIndex: 3,
  },
  cornerBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 46,
    height: 46,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomRightRadius: 22,
    opacity: 0.7,
    zIndex: 3,
  },
  inner: {
    flex: 1,
    paddingTop: 22,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  topContent: {
    flex: 1,
  },
  eyebrow: {
    alignSelf: "flex-start",
    minHeight: 28,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 14,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  eyebrowText: {
    fontFamily: "PlusJakartaSans_700Bold",
    fontSize: 9.5,
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  quoteMark: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 48,
    lineHeight: 30,
    marginBottom: 8,
    opacity: 0.95,
  },
  phraseWrap: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 10,
  },
  phrase: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 29,
    lineHeight: 35,
    letterSpacing: -0.6,
    maxWidth: "96%",
  },
  bottomBlock: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  actionBtn: {
    flex: 1,
    minHeight: 39,
    borderWidth: 1,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  actionText: {
    fontFamily: "PlusJakartaSans_500Medium",
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
