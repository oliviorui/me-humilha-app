import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { useAppTheme } from "../../src/theme/ThemeProvider";

type TabIconProps = {
  color: string;
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  focusedName: keyof typeof Ionicons.glyphMap;
};

function TabIcon({ color, focused, name, focusedName }: TabIconProps) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.iconWrap,
        focused
          ? {
              backgroundColor: palette.glow,
              borderColor: palette.accent2,
            }
          : null,
      ]}
    >
      <Ionicons name={focused ? focusedName : name} size={22} color={color} />
    </View>
  );
}

const styles = {
  iconWrap: {
    width: 42,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

export default function TabsLayout() {
  const { palette, isDark } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        sceneStyle: {
          backgroundColor: palette.bg,
        },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 14,
          height: 72,
          paddingTop: 8,
          paddingBottom: 9,
          paddingHorizontal: 8,
          backgroundColor: isDark
            ? "rgba(13,10,18,0.9)"
            : "rgba(243,238,255,0.94)",
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: palette.border,
          borderRadius: 26,
          shadowColor: palette.shadow,
          shadowOpacity: 0.24,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={22}
            tint={isDark ? "dark" : "light"}
            style={{ flex: 1, borderRadius: 26, overflow: "hidden" }}
          />
        ),
        tabBarActiveTintColor: palette.accent2,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: {
          fontFamily: "PlusJakartaSans_700Bold",
          fontSize: 10.5,
          marginTop: 1,
        },
        tabBarItemStyle: {
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              name="home-outline"
              focusedName="home"
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
              color={color}
              focused={focused}
              name="bookmark-outline"
              focusedName="bookmark"
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
              color={color}
              focused={focused}
              name="settings-outline"
              focusedName="settings"
            />
          ),
        }}
      />
    </Tabs>
  );
}
