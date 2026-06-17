import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type AppHeaderProps = {
  title?: string;
};

function AppHeader({ title = "ME HUMILHA" }: AppHeaderProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.header}>
      <View style={styles.logoArea}>
        <View
          style={[
            styles.logoMark,
            {
              shadowColor: palette.accent2,
              borderColor: palette.border,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleWrap}>
          <Text style={[styles.logoText, { color: palette.text }]}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(AppHeader);

const styles = StyleSheet.create({
  header: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#c054e0",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.36,
    shadowRadius: 18,
    elevation: 6,
    flexShrink: 0,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  logoText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 24,
    letterSpacing: 2.6,
    lineHeight: 25,
  },
});
