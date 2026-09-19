import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrencyDisplay from "../../components/CurrencyDisplay";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ObjectImage from "../../components/ObjectImage";
import PrimaryButton from "../../components/PrimaryButton";
import RarityBadge from "../../components/RarityBadge";
import { colors } from "../../constants/colors";
import { items } from "../../data/items";

export default function ItemDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = items.find((i) => i.id === id);
  const [favorite, setFavorite] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!item) return null;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header onBack={() => router.back()} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 8 }}>
        <View className="items-center justify-center my-4">
          <ObjectImage id={item.id} rarity={item.rarity} size={160} />
          <Pressable
            onPress={() => setFavorite((f) => !f)}
            className="absolute top-0 right-0 bg-surface p-2 rounded-full"
          >
            <Heart
              size={20}
              color={favorite ? colors.danger : colors.textSecondary}
              fill={favorite ? colors.danger : "transparent"}
            />
          </Pressable>
        </View>

        <Text className="text-3xl font-bold text-textPrimary">{item.name}</Text>
        <RarityBadge rarity={item.rarity} size="lg" />
        <CurrencyDisplay type={item.currency} amount={item.price} />

        <Text className="text-textSecondary mt-2">{item.description}</Text>

        <View className="bg-surface rounded-2xl p-4 mt-4 gap-2">
          <Text className="text-textMuted text-xs font-semibold tracking-wide">STATS</Text>
          <View className="flex-row items-center gap-2">
            <Sparkles size={16} color={colors.primary} />
            <Text className="text-textPrimary font-semibold">+{item.xpPerHour} XP / hour</Text>
          </View>
          {item.unlocks && (
            <>
              <Text className="text-textMuted text-xs font-semibold tracking-wide mt-2">
                UNLOCKS
              </Text>
              <Text className="text-textPrimary font-semibold">{item.unlocks}</Text>
            </>
          )}
        </View>
      </ScrollView>

      <View className="p-4">
        <PrimaryButton
          label={item.owned ? "Already Owned" : `Buy Now — ${item.price} ${item.currency}`}
          disabled={item.owned}
          onPress={() => setConfirmVisible(true)}
        />
      </View>

      <Modal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Confirm Purchase"
      >
        <Text className="text-textSecondary">
          Buy {item.name} for {item.price} {item.currency}?
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