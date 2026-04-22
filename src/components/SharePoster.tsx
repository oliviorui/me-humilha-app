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
  const { palette, isDark } = useAppTheme();
  const isStory = variant === "story";

  return (
    <View
      style={[
        styles.poster,
        isStory ? styles.posterStory : styles.posterSquare,
        { backgroundColor: palette.backgroundAlt },
      ]}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: isDark
                ? "rgba(20,12,32,0.22)"
                : "rgba(255,248,236,0.12)",
            },
          ]}
        />

        <View
          style={[
            styles.outerBorder,
            {
              borderColor: isDark
                ? "rgba(255,255,255,0.86)"
                : "rgba(24,18,37,0.82)",
            },
          ]}
        />

        <View style={styles.logoBadgeWrap}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: isDark
                  ? "rgba(20,12,32,0.88)"
                  : "rgba(255,255,255,0.86)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(24,18,37,0.10)",
              },
            ]}
          >
            <Text
              style={[
                styles.logoBadgeText,
                { color: isDark ? palette.text : palette.text },
              ]}
            >
              Me Humilha
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text
            style={[
              styles.quote,
              isStory ? styles.quoteStory : null,
              {
                color: isDark ? "#FFFFFF" : "#171320",
                textShadowColor: isDark
                  ? "rgba(0,0,0,0.28)"
                  : "rgba(255,255,255,0.24)",
              },
            ]}
          >
            {quote}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 14,
  },
  posterSquare: {
    aspectRatio: 1,
  },
  posterStory: {
    aspectRatio: 9 / 16,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  outerBorder: {
    ...StyleSheet.absoluteFillObject,
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
    borderWidth: 1.2,
    borderRadius: 8,
  },
  logoBadgeWrap: {
    position: "absolute",
    top: 18,
    left: 18,
    zIndex: 3,
  },
  logoBadge: {
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    justifyContent: "center",
  },
  logoBadgeText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 28,
  },
  quote: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "700",
    fontFamily: "CormorantGaramond_700Bold",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
  quoteStory: {
    fontSize: 34,
    lineHeight: 48,
  },
});
