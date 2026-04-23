import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
        { backgroundColor: palette.backgroundSecondary },
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
                ? "rgba(11, 6, 20, 0.62)"
                : "rgba(243, 237, 249, 0.62)",
            },
          ]}
        />

        <View
          style={[
            styles.frame,
            {
              borderColor: palette.border,
              backgroundColor: isDark
                ? "rgba(18, 12, 30, 0.34)"
                : "rgba(255,255,255,0.22)",
            },
          ]}
        >
          <LinearGradient
            colors={[palette.primary, palette.primaryStrong, palette.accent]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.brandTag}
          >
            <Text style={styles.brandTagText}>ME HUMILHA</Text>
          </LinearGradient>

          <Text
            style={[
              styles.quote,
              isStory ? styles.quoteStory : null,
              {
                color: palette.text,
                textShadowColor: isDark
                  ? "rgba(0,0,0,0.36)"
                  : "rgba(255,255,255,0.16)",
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
    borderRadius: 24,
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
    opacity: 0.34,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  frame: {
    flex: 1,
    margin: 12,
    borderRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 22,
    justifyContent: "space-between",
  },
  brandTag: {
    alignSelf: "flex-start",
    minHeight: 34,
    borderRadius: 999,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  brandTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  quote: {
    flex: 1,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginTop: 18,
  },
  quoteStory: {
    fontSize: 38,
    lineHeight: 46,
  },
});
