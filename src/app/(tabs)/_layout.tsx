
import { Tabs } from "expo-router";
import BottomTabBar from "../../components/BottomTabBar";

// The 5 main sections of the app. We supply our own tabBar (BottomTabBar)
// so it matches the app's custom dark, game-like visual style instead of
// the platform default tab bar.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="items" options={{ title: "Items" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}