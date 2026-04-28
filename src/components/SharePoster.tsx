import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../theme/ThemeProvider";

type SharePosterProps = {
  quote: string;
  image: number;
};

export default function SharePoster({ quote, image }: SharePosterProps) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.poster,
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
        style={styles.card}
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
          <View>
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
          </View>

          <View style={styles.phraseWrap}>
            <Text style={[styles.phrase, { color: palette.text }]}>{quote}</Text>
          </View>

          <View>
            <View style={[styles.divider, { backgroundColor: palette.border }]} />

            <Text style={[styles.signature, { color: palette.textMuted }]}>
              ME HUMILHA
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: 1080,
    height: 1080,
    borderWidth: 1,
    borderRadius: 64,
    overflow: "hidden",
  },
  card: {
    flex: 1,
    position: "relative",
  },
  bgImage: {
    opacity: 0.4,
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
    height: "38%",
    backgroundColor: "rgba(13,10,18,0.48)",
  },
  cornerTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 64,
    opacity: 0.85,
    zIndex: 3,
  },
  cornerBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 150,
    height: 150,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 64,
    opacity: 0.7,
    zIndex: 3,
  },
  inner: {
    flex: 1,
    paddingTop: 92,
    paddingRight: 76,
    paddingBottom: 76,
    paddingLeft: 76,
    justifyContent: "space-between",
  },
  eyebrow: {
    alignSelf: "flex-start",
    minHeight: 68,
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 30,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginBottom: 72,
  },
  eyebrowDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  eyebrowText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
    letterSpacing: 7,
    textTransform: "uppercase",
  },
  quoteMark: {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 170,
    lineHeight: 100,
    opacity: 0.95,
  },
  phraseWrap: {
    flex: 1,
    justifyContent: "center",
  },
  phrase: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 92,
    lineHeight: 96,
    letterSpacing: 1,
    maxWidth: "92%",
  },
  divider: {
    height: 2,
    marginBottom: 28,
  },
  signature: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
    letterSpacing: 8,
    textTransform: "uppercase",
  },
});
