import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { levels } from "@/data/levels";

export default function ReferenceScreen() {
  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Reference</Text>
      <Text className="mt-3 text-3xl font-black text-white">Learn by doing.</Text>
      <Text className="mt-2 text-base leading-6 text-slate-300">Start with direct movement, then let loops and sensing take over.</Text>
      <View className="mt-7 gap-3">
        {[
          ["01", "Direct movement", "Call moveForward() to reach a nearby goal."],
          ["02", "Turns", "Change direction when the route bends."],
          ["03", "Loops", "Repeat a small action instead of writing it eight times."],
          ["04", "Sensing", "Use isWallAhead() and atGoal() to react to the maze."],
        ].map(([number, title, description]) => (
          <View key={number} className="flex-row rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
            <Text className="w-10 text-lg font-black text-cyan-300">{number}</Text>
            <View className="flex-1">
              <Text className="text-base font-bold text-white">{title}</Text>
              <Text className="mt-1 text-sm leading-5 text-slate-400">{description}</Text>
            </View>
          </View>
        ))}
      </View>
      <Link href={{ pathname: "/level/[id]", params: { id: levels[0].id } }} asChild>
        <Pressable className="mt-7 rounded-2xl bg-cyan-300 px-4 py-4">
          <Text className="text-center font-black text-slate-950">Start first challenge</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}
