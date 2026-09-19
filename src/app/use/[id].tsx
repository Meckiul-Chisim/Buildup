import { useLocalSearchParams, useRouter } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ObjectImage from "../../components/ObjectImage";
import PrimaryButton from "../../components/PrimaryButton";
import RarityBadge from "../../components/RarityBadge";
import { colors } from "../../constants/colors";
import { items } from "../../data/items";

// Maps an object's activity type to the route it should open when "Use"
// is pressed. Only "coding" has a built-in prototype screen (Challenge);
// everything else just closes back to where the user came from for now.
const ACTIVITY_ROUTES: Record<string, string> = {
  coding: "/challenge/[id]",
};

export default function UseObjectScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = items.find((i) => i.id === id);

  if (!item) return null;

  const targetRoute = item.activity ? ACTIVITY_ROUTES[item.activity.type] : undefined;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header onBack={() => router.back()} />

      <View className="flex-1 items-center px-4 gap-2">
        <ObjectImage id={item.id} rarity={item.rarity} size={140} />
        <Text className="text-2xl font-bold text-textPrimary mt-3">{item.name}</Text>
        <RarityBadge rarity={item.rarity} />
        <Text className="text-textSecondary text-xs">Level {item.level}</Text>

        <Text className="text-textSecondary text-center mt-2">{item.description}</Text>

        <PrimaryButton
          label={`▶ ${item.activity?.label ?? "Use"}`}
          onPress={() =>
            targetRoute
              ? router.push({ pathname: targetRoute as any, params: { id: item.id } })
              : router.back()
          }
          className="w-full mt-6"
        />

        <View className="w-full bg-surface rounded-2xl p-4 mt-8 gap-3">
          <View className="flex-row items-center gap-2">
            <Sparkles size={16} color={colors.primary} />
            <Text className="text-textPrimary font-semibold">
              Next Level: +{item.nextLevelXpPerHour} XP / hour
            </Text>
          </View>
          <PrimaryButton
            label="Upgrade"
            variant="outline"
            onPress={() => router.push({ pathname: "/upgrade/[id]", params: { id: item.id } })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}