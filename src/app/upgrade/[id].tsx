import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowRight, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrencyDisplay from "../../components/CurrencyDisplay";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ObjectImage from "../../components/ObjectImage";
import PrimaryButton from "../../components/PrimaryButton";
import RarityBadge from "../../components/RarityBadge";
import { colors } from "../../constants/colors";
import { items } from "../../data/items";
import { user } from "../../data/user";

export default function UpgradeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = items.find((i) => i.id === id);
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!item) return null;

  const canAfford = user.coins >= item.upgradeCost;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header onBack={() => router.back()} />

      <View className="flex-1 items-center px-4 gap-2">
        <ObjectImage id={item.id} rarity={item.rarity} size={140} />
        <Text className="text-2xl font-bold text-textPrimary mt-3">{item.name}</Text>
        <RarityBadge rarity={item.rarity} />

        <View className="flex-row items-center gap-2 mt-2">
          <Text className="text-textSecondary font-semibold">Level {item.level}</Text>
          <ArrowRight size={16} color={colors.textMuted} />
          <Text className="text-primary font-semibold">Level {item.level + 1}</Text>
        </View>

        <View className="w-full bg-surface rounded-2xl p-4 mt-4 gap-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-textMuted text-xs">Current</Text>
            <Text className="text-textPrimary font-semibold">+{item.xpPerHour} XP / hour</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-textMuted text-xs">After Upgrade</Text>
            <View className="flex-row items-center gap-1">
              <Sparkles size={14} color={colors.primary} />
              <Text className="text-primary font-semibold">
                +{item.nextLevelXpPerHour} XP / hour
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center w-full mt-4">
          <Text className="text-textSecondary">Upgrade Cost</Text>
          <CurrencyDisplay type="coins" amount={item.upgradeCost} />
        </View>

        <PrimaryButton
          label="Upgrade"
          disabled={!canAfford}
          onPress={() => setConfirmVisible(true)}
          className="w-full mt-4"
        />
        {!canAfford && <Text className="text-danger text-xs mt-2">Not enough coins</Text>}
      </View>

      <Modal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Confirm Upgrade"
      >
        <Text className="text-textSecondary">
          Upgrade {item.name} to Level {item.level + 1} for {item.upgradeCost} coins?
        </Text>
        <PrimaryButton
          label="Confirm"
          onPress={() => {
            setConfirmVisible(false);
            router.back();
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}