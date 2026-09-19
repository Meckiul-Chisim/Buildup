import { useRouter } from "expo-router";
import { ChevronDown, Gift, Settings } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrencyDisplay from "../../components/CurrencyDisplay";
import Modal from "../../components/Modal";
import PrimaryButton from "../../components/PrimaryButton";
import ProgressBar from "../../components/ProgressBar";
import RoomObject from "../../components/RoomObject";
import XPBar from "../../components/XpBar";

import { colors } from "../../constants/colors";
import { items } from "../../data/items";
import { missions } from "../../data/missions";
import { roomObjects, rooms } from "../../data/rooms";
import { user } from "../../data/user";

const ROOM_HEIGHT = Dimensions.get("window").height * 0.42;

export default function HomeScreen() {
  const router = useRouter();
  const currentRoom = rooms.find((r) => r.id === user.currentRoom)!;
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const completedMissions = missions.filter((m) => m.completed).length;
  const selectedItem = items.find((i) => i.id === selectedObjectId);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top status bar: avatar, level, currencies */}
        <View className="flex-row items-center px-4 pt-2 gap-3">
          <View className="w-11 h-11 rounded-full bg-surfaceElevated border border-border items-center justify-center">
            <Text className="text-lg font-semibold text-primary">
              {user.username.charAt(0)}
            </Text>
          </View>

          <View className="flex-1">
            <XPBar level={user.level} xp={user.xp} xpToNextLevel={user.xpToNextLevel} />
          </View>

          <Pressable hitSlop={10}>
            <Settings size={22} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View className="flex-row gap-2 px-4 mt-3">
          <CurrencyDisplay type="coins" amount={user.coins} />
          <CurrencyDisplay type="gems" amount={user.gems} />
        </View>

        {/* Room selector */}
        <Pressable
          onPress={() => router.push("/rooms")}
          className="flex-row items-center self-start gap-1 mx-4 mt-4 bg-surface py-2 px-3 rounded-full"
        >
          <Text className="text-textPrimary font-semibold">{currentRoom.name}</Text>
          <ChevronDown size={18} color={colors.textSecondary} />
        </Pressable>

        {/* The virtual room — visual centerpiece */}
        <View
          style={{ height: ROOM_HEIGHT }}
          className="mx-4 mt-3 bg-surface rounded-3xl border border-border overflow-hidden"
        >
          {roomObjects
            .filter((obj) => currentRoom.objects.includes(obj.id))
            .map((obj) => {
              const itemData = items.find((i) => i.id === obj.id);
              return (
                <RoomObject
                  key={obj.id}
                  id={obj.id}
                  rarity={itemData?.rarity}
                  x={obj.x}
                  y={obj.y}
                  roomHeight={ROOM_HEIGHT}
                  onPress={setSelectedObjectId}
                />
              );
            })}
        </View>

        {/* Daily mission summary card */}
        <View className="m-4 bg-surface rounded-2xl p-4 gap-2">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-textMuted text-xs font-semibold tracking-wide">
                DAILY MISSION
              </Text>
              <Text className="text-textPrimary font-semibold mt-0.5">
                Complete 3 activities today
              </Text>
            </View>
            <Gift size={22} color={colors.coin} />
          </View>
          <ProgressBar progress={completedMissions / 3} />
          <Text className="text-textSecondary text-xs self-end">
            {Math.min(completedMissions, 3)} / 3
          </Text>
        </View>
      </ScrollView>

      {/* Object interaction panel */}
      <Modal
        visible={!!selectedObjectId}
        onClose={() => setSelectedObjectId(null)}
        title={selectedItem?.name}
      >
        {selectedItem && (
          <>
            <Text className="text-textSecondary">{selectedItem.description}</Text>
            <PrimaryButton
              label={selectedItem.activity ? "Use" : "View Details"}
              onPress={() => {
                setSelectedObjectId(null);
                router.push(
                  selectedItem.activity
                    ? { pathname: "/use/[id]", params: { id: selectedItem.id } }
                    : { pathname: "/item/[id]", params: { id: selectedItem.id } }
                );
              }}
            />
          </>
        )}
      </Modal>
    </SafeAreaView>
  );
}