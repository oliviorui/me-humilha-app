import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "../../src/theme/ThemeProvider";

type TabIconProps = {
  color: string;
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
};

function TabIcon({ color, focused, name }: TabIconProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.iconWrap}>
      {focused ? (
        <View
          style={[
            styles.activeLine,
            {
              backgroundColor: palette.accent2,
              shadowColor: palette.accent2,
            },
          ]}
        />
      ) : null}

      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

const styles = {
  iconWrap: {
    width: 32,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  activeLine: {
    position: "absolute" as const,
    top: -12,
    width: 32,
    height: 2.5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
};

export default function TabsLayout() {
  const { palette, isDark } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: palette.bg,
        },
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 68,
          paddingTop: 0,
          paddingBottom: 6,
          backgroundColor: isDark
            ? "rgba(13,10,18,0.84)"
            : "rgba(243,238,255,0.88)",
          borderTopWidth: 1,
          borderTopColor: palette.border,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={18}
            tint={isDark ? "dark" : "light"}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: palette.accent2,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: {
          fontFamily: "DMSans_500Medium",
          fontSize: 10.5,
          letterSpacing: 0.3,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="home-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Guardadas",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="bookmark-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Definições",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="options-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
