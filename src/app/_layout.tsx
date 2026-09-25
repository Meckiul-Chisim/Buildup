import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import { BuildupSplash } from "@/components/BuildupSplash";
import "../global.css";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    let mounted = true;

    const start = async () => {
      await SplashScreen.hideAsync();

      const timer = setTimeout(() => {
        if (mounted) setShowSplash(false);
      }, 900);

      return () => clearTimeout(timer);
    };

    start();

    return () => {
      mounted = false;
    };
  }, []);

  if (showSplash) {
    return <BuildupSplash />;
  }

  return (
    <AuthProvider>
      <GameProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="levels" />
          <Stack.Screen name="courses" />
          <Stack.Screen name="course/[id]" />
          <Stack.Screen name="challenge/[id]" />
          <Stack.Screen name="item/[id]" />
          <Stack.Screen name="level/[id]" />
          <Stack.Screen name="rooms" />
          <Stack.Screen name="how-to-play" />
          <Stack.Screen name="settings" />
        </Stack>
      </GameProvider>
    </AuthProvider>
  );
}
