import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SharePosterProps = {
  image: ImageSourcePropType;
  quote: string;
  subtitle?: string;
  footer?: string;
};

export default function SharePoster({
  image,
  quote,
  subtitle = "Frase do dia",
  footer = "coach reverso.exe",
}: SharePosterProps) {
  return (
    <View style={styles.poster}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <View style={styles.frame}>
          <Corner position="topLeft" />
          <Corner position="topRight" />
          <Corner position="bottomLeft" />
          <Corner position="bottomRight" />

          <View style={styles.content}>
            <View style={styles.centerContent}>
              <Text style={styles.quote}>{quote}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <View style={styles.footerArea}>
              <Text style={styles.footerBrand}>{footer}</Text>
              <Text style={styles.footerSubtext}>
                Cada dia pior, com estética.
              </Text>
            </View>
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
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#0c1016",
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(32, 54, 74, 0.30)",
  },
  frame: {
    flex: 1,
    margin: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.76)",
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    paddingHorizontal: 34,
    paddingVertical: 34,
    justifyContent: "space-between",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quote: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 27,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: "serif",
    marginBottom: 18,
    textShadowColor: "rgba(0,0,0,0.28)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.96)",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "serif",
    textShadowColor: "rgba(0,0,0,0.22)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footerArea: {
    alignItems: "flex-end",
  },
  footerBrand: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "serif",
  },
  footerSubtext: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
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
