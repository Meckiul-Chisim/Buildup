import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { levels } from "@/data/levels";

export default function LevelArchiveScreen() {
  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Level archive</Text>
      <Text className="mt-3 text-3xl font-black text-white">Every route, ready to replay.</Text>
      <Text className="mt-2 text-base leading-6 text-slate-300">Return here when you want to test a cleaner program or revisit an idea.</Text>
      <View className="mt-7 gap-3">
        {levels.map((level, index) => (
          <Link key={level.id} href={{ pathname: "/level/[id]", params: { id: level.id } }} asChild>
            <Pressable className="rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
              <Text className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Route 0{index + 1}</Text>
              <Text className="mt-2 text-xl font-bold text-white">{level.name}</Text>
              <Text className="mt-1 text-sm leading-5 text-slate-400">{level.description}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <Link href="/home" className="mt-7 text-center font-bold text-cyan-300">Back to levels</Link>
    </ScrollView>
  );
}
