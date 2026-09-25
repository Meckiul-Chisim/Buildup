import { Tabs } from "expo-router";
import { BookOpen, Bot, CircleUserRound, Flag, Gauge } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#28e0a4",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#0b1120",
          borderTopColor: "#1e293b",
          borderTopWidth: 1,
          height: 74,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          borderRadius: 16,
          marginHorizontal: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: 0.12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Levels",
          tabBarIcon: ({ color, size, focused }) => (
            <Flag size={size} color={color} fill={focused ? color : "transparent"} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color, size, focused }) => (
            <Gauge size={size} color={color} fill={focused ? color : "transparent"} />
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: "Robot API",
          tabBarIcon: ({ color, size, focused }) => (
            <Bot size={size} color={color} fill={focused ? color : "transparent"} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "JS Course",
          tabBarIcon: ({ color, size, focused }) => (
            <BookOpen size={size} color={color} fill={focused ? color : "transparent"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size, focused }) => (
            <CircleUserRound size={size} color={color} fill={focused ? color : "transparent"} />
          ),
        }}
      />
    </Tabs>
  );
}