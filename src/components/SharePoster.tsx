import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  const isStory = variant === "story";

  return (
    <View
      style={[
        styles.poster,
        isStory ? styles.posterStory : styles.posterSquare,
      ]}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <View style={styles.outerBorder} />

        <View style={styles.content}>
          <Text
            style={[
              styles.quote,
              isStory ? styles.quoteStory : null,
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
    backgroundColor: "#111827",
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
    backgroundColor: "rgba(32,54,74,0.24)",
  },

  outerBorder: {
    ...StyleSheet.absoluteFillObject,
    top: 3,
    right: 3,
    bottom: 3,
    left: 3,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.82)",
    borderRadius: 8,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 28,
  },

  quote: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "700",
    fontFamily: "CormorantGaramond_700Bold",
    textShadowColor: "rgba(0,0,0,0.28)",
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
