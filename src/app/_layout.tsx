import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { GameProvider } from "../context/GameContext";
import "../global.css";

// Root layout: wraps the whole app. GameProvider makes coins/XP/inventory
// state available to every screen via useGame(). MainTabs live at "(tabs)";
// every other route (item details, activities, rooms, upgrades) is pushed
// on top as a full-screen stack route with its own back button.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="item/[id]" />
          <Stack.Screen name="use/[id]" />
          <Stack.Screen name="challenge/[id]" />
          <Stack.Screen name="rooms" />
          <Stack.Screen name="upgrade/[id]" />
        </Stack>
      </GameProvider>
    </SafeAreaProvider>
  );
}