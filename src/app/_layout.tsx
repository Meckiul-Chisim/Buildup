import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import "../global.css";

export default function RootLayout() {
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
