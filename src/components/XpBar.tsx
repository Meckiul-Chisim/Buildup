import { Text, View } from "react-native";
import ProgressBar from "./ProgressBar";

interface XPBarProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
}

// Shows "Level N" plus a labeled XP progress bar. Used on Home and Profile.
export default function XPBar({ level, xp, xpToNextLevel }: XPBarProps) {
  const progress = xpToNextLevel > 0 ? xp / xpToNextLevel : 0;

  return (
    <View className="w-full gap-1">
      <View className="flex-row justify-between">
        <Text className="text-textPrimary font-semibold text-base">
          Level {level}
        </Text>
        <Text className="text-textSecondary text-xs">
          {xp} / {xpToNextLevel} XP
        </Text>
      </View>
      <ProgressBar progress={progress} />
    </View>
  );
}