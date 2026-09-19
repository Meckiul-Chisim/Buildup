import { CheckSquare, Coins, Sparkles, Square } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Mission } from "../types";

interface MissionCardProps {
  mission: Mission;
}

// A single mission row used on the Home mini-card and the full Missions screen.
export default function MissionCard({ mission }: MissionCardProps) {
  const Icon = mission.completed ? CheckSquare : Square;

  return (
    <View className="flex-row items-center gap-3 bg-surface rounded-2xl p-3">
      <Icon size={20} color={mission.completed ? colors.primary : colors.textMuted} />
      <View className="flex-1 gap-1">
        <Text className={`text-base ${mission.completed ? "text-textSecondary" : "text-textPrimary"}`}>
          {mission.title}
        </Text>
        <View className="flex-row items-center gap-1">
          <Sparkles size={12} color={colors.primary} />
          <Text className="text-textSecondary text-xs mr-2">+{mission.xp} XP</Text>
          <Coins size={12} color={colors.coin} />
          <Text className="text-textSecondary text-xs mr-2">+{mission.coins}</Text>
        </View>
      </View>
    </View>
  );
}