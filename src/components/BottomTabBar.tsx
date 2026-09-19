import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs/types";
import { CheckSquare, Home, Package, ShoppingBag, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { colors } from "../constants/colors";

// Custom tab bar passed to <Tabs tabBar={...}> in app/(tabs)/_layout.tsx.
// We render this ourselves (instead of the default look) for full control
// over the subtle green highlight the design calls for.
const ICONS: Record<string, typeof Home> = {
  index: Home,
  shop: ShoppingBag,
  items: Package,
  tasks: CheckSquare,
  profile: User,
};

const LABELS: Record<string, string> = {
  index: "Home",
  shop: "Shop",
  items: "Items",
  tasks: "Tasks",
  profile: "Profile",
};

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-surface border-t border-border pt-2 pb-4">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = ICONS[route.name] ?? Home;
        const label = LABELS[route.name] ?? route.name;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="flex-1 items-center gap-1"
          >
            <View
              className={`px-4 py-1 rounded-full ${isFocused ? "bg-primary/15" : ""}`}
            >
              <Icon size={22} color={isFocused ? colors.primary : colors.textMuted} />
            </View>
            <Text
              style={{ color: isFocused ? colors.primary : colors.textMuted }}
              className="text-[11px]"
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}