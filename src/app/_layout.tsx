import { Stack } from "expo-router";

import { GameProvider } from "@/context/GameContext";
import "../global.css";

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="item/[id]" />
        <Stack.Screen name="level/[id]" />
        <Stack.Screen name="rooms" />
        <Stack.Screen name="how-to-play" />
        <Stack.Screen name="settings" />
      </Stack>
    </GameProvider>
  );
}