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

        <View
          style={[
            styles.frame,
            isStory ? styles.frameStory : styles.frameSquare,
          ]}
        >
          <Corner position="topLeft" />
          <Corner position="topRight" />
          <Corner position="bottomLeft" />
          <Corner position="bottomRight" />

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
        </View>
      </ImageBackground>
    </View>
  );
}

type CornerProps = {
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
};

function Corner({ position }: CornerProps) {
  const isTop = position === "topLeft" || position === "topRight";
  const isLeft = position === "topLeft" || position === "bottomLeft";

  return (
    <View
      style={[
        styles.cornerBase,
        isTop ? styles.cornerTop : styles.cornerBottom,
        isLeft ? styles.cornerLeft : styles.cornerRight,
      ]}
    >
      <View
        style={[
          styles.cornerHorizontal,
          isTop ? styles.cornerHorizontalTop : styles.cornerHorizontalBottom,
          isLeft ? styles.cornerHorizontalLeft : styles.cornerHorizontalRight,
        ]}
      />
      <View
        style={[
          styles.cornerVertical,
          isTop ? styles.cornerVerticalTop : styles.cornerVerticalBottom,
          isLeft ? styles.cornerVerticalLeft : styles.cornerVerticalRight,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#111827",
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
    backgroundColor: "rgba(32,54,74,0.28)",
  },
  frame: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.82)",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  frameSquare: {
    margin: 22,
  },
  frameStory: {
    margin: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
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
  cornerBase: {
    position: "absolute",
    width: 22,
    height: 22,
    zIndex: 5,
  },
  cornerTop: {
    top: -1,
  },
  cornerBottom: {
    bottom: -1,
  },
  cornerLeft: {
    left: -1,
  },
  cornerRight: {
    right: -1,
  },
  cornerHorizontal: {
    position: "absolute",
    height: 1.4,
    width: 14,
    backgroundColor: "rgba(255,255,255,0.96)",
  },
  cornerVertical: {
    position: "absolute",
    width: 1.4,
    height: 14,
    backgroundColor: "rgba(255,255,255,0.96)",
  },
  cornerHorizontalTop: {
    top: 0,
  },
  cornerHorizontalBottom: {
    bottom: 0,
  },
  cornerHorizontalLeft: {
    left: 0,
  },
  cornerHorizontalRight: {
    right: 0,
  },
  cornerVerticalTop: {
    top: 0,
  },
  cornerVerticalBottom: {
    bottom: 0,
  },
  cornerVerticalLeft: {
    left: 0,
  },
  cornerVerticalRight: {
    right: 0,
  },
});
