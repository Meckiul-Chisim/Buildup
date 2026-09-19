import { Coins, Gift, Sparkles } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import MissionCard from "../../components/MissionCard";
import ProgressBar from "../../components/ProgressBar";
import { colors } from "../../constants/colors";
import { dailyReward, missions } from "../../data/missions";

export default function MissionsScreen() {
  const completedCount = missions.filter((m) => m.completed).length;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Today's Missions" />

      <FlatList
        data={missions}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="bg-surface rounded-2xl p-4 gap-2 mb-4">
            <Text className="text-textPrimary font-semibold">
              {completedCount} / {missions.length} completed
            </Text>
            <ProgressBar progress={completedCount / missions.length} />
          </View>
        }
        renderItem={({ item }) => <MissionCard mission={item} />}
        ListFooterComponent={
          <View className="bg-surface rounded-2xl p-4 gap-3 mt-4">
            <View className="flex-row items-center gap-2">
              <Gift size={20} color={colors.coin} />
              <Text className="text-lg font-semibold text-textPrimary">Daily Reward</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Sparkles size={16} color={colors.primary} />
              <Text className="text-textPrimary font-semibold mr-2">+{dailyReward.xp} XP</Text>
              <Coins size={16} color={colors.coin} />
              <Text className="text-textPrimary font-semibold mr-2">+{dailyReward.coins} coins</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}