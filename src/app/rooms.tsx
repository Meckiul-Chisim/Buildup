import { useRouter } from "expo-router";
import { Check, Lock } from "lucide-react-native";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import { colors } from "../constants/colors";
import { rooms } from "../data/rooms";
import { user } from "../data/user";

export default function RoomsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Rooms" onBack={() => router.back()} />

      <FlatList
        data={rooms}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item: room }) => {
          const isCurrent = room.id === user.currentRoom;
          const isUnlocked = user.level >= room.unlockLevel;

          return (
            <Pressable
              onPress={() => router.back()}
              className={`flex-row items-center gap-3 bg-surface rounded-2xl p-3 border ${isCurrent ? "border-primary" : "border-border"}`}
            >
              <View className="w-14 h-14 rounded-xl bg-surfaceElevated items-center justify-center">
                {!isUnlocked && <Lock size={22} color={colors.textMuted} />}
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-textPrimary font-semibold">{room.name}</Text>
                {isCurrent ? (
                  <View className="flex-row items-center gap-1">
                    <Check size={14} color={colors.primary} />
                    <Text className="text-primary text-xs">Current Room</Text>
                  </View>
                ) : isUnlocked ? (
                  <Text className="text-textSecondary text-xs">Unlocked</Text>
                ) : (
                  <Text className="text-textMuted text-xs">
                    Unlocks at Level {room.unlockLevel}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}