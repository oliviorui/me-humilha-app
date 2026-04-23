import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type PosterVariant = "square" | "story";

type SharePosterProps = {
  image: ImageSourcePropType;
  quote: string;
  variant: PosterVariant;
};

export default function SharePoster({
  image,
  quote,
  variant,
}: SharePosterProps) {
  const { palette } = useAppTheme();
  const isStory = variant === "story";

  return (
    <View
      style={[
        styles.poster,
        isStory ? styles.posterStory : styles.posterSquare,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={styles.bgImage}
        style={styles.posterInner}
      >
        <View
          style={[
            styles.bgOverlay,
            { backgroundColor: palette.overlay },
          ]}
        />

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

        <View
          style={[
            styles.eyebrow,
            { borderColor: palette.border },
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
          <Text style={[styles.eyebrowText, { color: palette.textMuted }]}>
            Desmotivação do dia
          </Text>
        </View>

        <Text style={[styles.quoteMark, { color: palette.accent2 }]}>”</Text>

        <Text
          style={[
            styles.phrase,
            isStory ? styles.phraseStory : null,
            { color: palette.text },
          ]}
        >
          {quote}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 24,
    borderWidth: 1,
  },
  posterSquare: {
    aspectRatio: 1,
  },
  posterStory: {
    aspectRatio: 9 / 16,
  },
  posterInner: {
    flex: 1,
    paddingTop: 36,
    paddingRight: 26,
    paddingBottom: 28,
    paddingLeft: 26,
    position: "relative",
    overflow: "hidden",
  },
  bgImage: {
    opacity: 0.08,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    opacity: 0.6,
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
    opacity: 0.4,
  },
  eyebrow: {
    alignSelf: "flex-start",
    minHeight: 28,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 24,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  eyebrowText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 9.5,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
  quoteMark: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 64,
    lineHeight: 36,
    marginBottom: 14,
    opacity: 0.75,
  },
  phrase: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: 0.5,
    flex: 1,
  },
  phraseStory: {
    fontSize: 42,
    lineHeight: 44,
  },
});
 