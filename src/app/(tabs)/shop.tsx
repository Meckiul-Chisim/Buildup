import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { levels } from "@/data/levels";

export default function ChallengesScreen() {
  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Challenges</Text>
      <Text className="mt-3 text-3xl font-black text-white">Build your instincts.</Text>
      <Text className="mt-2 text-base leading-6 text-slate-300">Each level introduces one new programming idea. Replay any cleared route to sharpen your solution.</Text>
      <View className="mt-7 gap-3">
        {levels.map((level, index) => (
          <Link key={level.id} href={{ pathname: "/level/[id]", params: { id: level.id } }} asChild>
            <Pressable className="flex-row items-center rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-cyan-300">
                <Text className="text-lg font-black text-slate-950">{String(index + 1).padStart(2, "0")}</Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold text-white">{level.name}</Text>
                <Text className="mt-1 text-sm text-slate-400">{level.description}</Text>
              </View>
              <Text className="text-xl text-cyan-300">›</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
