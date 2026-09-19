import {
    ChevronRight,
    HelpCircle,
    MessageSquare,
    Settings,
    Trophy,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrencyDisplay from "../../components/CurrencyDisplay";
import XPBar from "../../components/XpBar";
import { colors } from "../../constants/colors";
import { user } from "../../data/user";

const SETTINGS_ITEMS = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View className="items-center gap-3 mb-6">
          <View className="w-[72px] h-[72px] rounded-full bg-surfaceElevated border border-border items-center justify-center">
            <Text className="text-2xl font-bold text-primary">
              {user.username.charAt(0)}
            </Text>
          </View>
          <Text className="text-xl font-bold text-textPrimary">{user.username}</Text>
          <View className="w-full">
            <XPBar level={user.level} xp={user.xp} xpToNextLevel={user.xpToNextLevel} />
          </View>
          <View className="flex-row gap-2">
            <CurrencyDisplay type="coins" amount={user.coins} />
            <CurrencyDisplay type="gems" amount={user.gems} />
          </View>
        </View>

        <Text className="text-lg font-semibold text-textPrimary mb-3">Achievements</Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          {user.achievements.map((a) => (
            <View key={a.id} className="w-[47%] bg-surface rounded-2xl p-4 items-start gap-2">
              <Trophy size={22} color={a.unlocked ? colors.coin : colors.textMuted} />
              <Text
                style={{ color: a.unlocked ? colors.textPrimary : colors.textMuted }}
                className="font-semibold"
              >
                {a.title}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-lg font-semibold text-textPrimary mb-3">More</Text>
        <View className="gap-2">
          {SETTINGS_ITEMS.map(({ id, label, icon: Icon }) => (
            <Pressable
              key={id}
              className="flex-row items-center gap-3 bg-surface rounded-2xl p-3"
            >
              <Icon size={20} color={colors.textSecondary} />
              <Text className="flex-1 text-textPrimary">{label}</Text>
              <ChevronRight size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}