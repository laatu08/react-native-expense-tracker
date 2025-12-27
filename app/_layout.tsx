import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-reanimated";
import { Keyboard, Platform } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const hideNavBar = async () => {
      if (Platform.OS !== "android") return;
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("overlay-swipe");
    };

    // Hide on app start
    hideNavBar();

    // 1️⃣ When nav bar becomes visible (gesture, keyboard, etc.)
    const navSub = NavigationBar.addVisibilityListener(({ visibility }) => {
      if (visibility === "visible") {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(hideNavBar, 1000);
      }
    });

    // 2️⃣ When keyboard closes → re-hide nav bar
    const keyboardHideSub = Keyboard.addListener("keyboardDidHide", () => {
      // Small delay to let Android settle
      setTimeout(hideNavBar, 300);
    });

    return () => {
      if (timeout) clearTimeout(timeout);
      navSub.remove();
      keyboardHideSub.remove();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      {/* Status bar floats over content (no layout push) */}
      <StatusBar style="auto" translucent />
    </ThemeProvider>
  );
}
