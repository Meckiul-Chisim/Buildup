import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import "../global.css";

function AuthGate() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const inAuth = segments[0] === "auth";

  useEffect(() => {
    if (loading) return;

    if (!session && !inAuth) {
      router.replace("/auth");
      return;
    }

    if (session && inAuth) {
      router.replace("/home");
    }
  }, [loading, session, inAuth, router]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#08101f]">
        <ActivityIndicator size="large" color="#34D399" />
      </View>
    );
  }

  if ((!session && !inAuth) || (session && inAuth)) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="home" />
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
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GameProvider>
        <AuthGate />
      </GameProvider>
    </AuthProvider>
  );
}
