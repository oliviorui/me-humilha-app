import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ProgressBarProps = {
  progress: number;
  percentage: number;
  year: number;
};

export default function ProgressBar({
  progress,
  percentage,
  year,
}: ProgressBarProps) {
  const widthProgress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    widthProgress.value = withTiming(Math.max(progress, 0.02), {
      duration: 650,
      easing: Easing.out(Easing.cubic),
    });

    opacity.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });

    translateY.value = withTiming(0, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, opacity, translateY, widthProgress]);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthProgress.value * 100}%`,
    };
  });

  return (
    <Animated.View style={[styles.wrapper, wrapperAnimatedStyle]}>
      <BlurView intensity={20} tint="dark" style={styles.card}>
        <View style={styles.solidLayer} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.label}>Fim de {year}</Text>
              <Text style={styles.caption}>O ano segue acabando sem piedade.</Text>
            </View>

            <Text style={styles.value}>{percentage.toFixed(2)}%</Text>
          </View>

          <View style={styles.track}>
            <Animated.View style={[styles.fill, fillAnimatedStyle]} />
            <View style={styles.glow} />
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 18,
    overflow: "hidden",
  },
  card: {
    borderRadius: 18,
    backgroundColor: "rgba(15,15,20,0.86)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },
  solidLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(12,12,16,0.56)",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  label: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  caption: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  value: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  track: {
    width: "100%",
    height: 14,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.10)",
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
  glow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 80,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
