import { ScrollView, Text, View } from "react-native";

import { useGame } from "@/context/GameContext";
import { levels } from "@/data/levels";

export default function ProgressScreen() {
  const { state } = useGame();
  const completedLessons = state.missions.filter((mission) => mission.completed).length;
  const progress = Math.round((completedLessons / state.missions.length) * 100);

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Progress</Text>
      <Text className="mt-3 text-3xl font-black text-white">Keep your streak alive.</Text>
      <View className="mt-7 rounded-3xl border border-slate-700 bg-[#101a2d] p-5">
        <View className="flex-row items-center">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300">
            <Text className="text-2xl font-black text-slate-950">{state.user.avatar}</Text>
          </View>
          <View className="ml-4">
            <Text className="text-xl font-bold text-white">{state.user.username}</Text>
            <Text className="mt-1 text-sm text-slate-400">Explorer level {state.user.level}</Text>
          </View>
        </View>
        <Text className="mt-6 text-sm text-slate-400">Lesson progress</Text>
        <View className="mt-2 h-2 rounded-full bg-slate-800"><View className="h-2 rounded-full bg-cyan-300" style={{ width: `${progress}%` }} /></View>
        <Text className="mt-2 text-right text-xs font-bold text-cyan-200">{completedLessons}/{state.missions.length} complete</Text>
      </View>
      <View className="mt-4 flex-row gap-3">
        {[["Levels", levels.length], ["XP", state.user.xp], ["API cap", "500"]].map(([label, value]) => (
          <View key={String(label)} className="flex-1 rounded-2xl border border-slate-700 bg-[#101a2d] p-3">
            <Text className="text-xs uppercase tracking-[0.15em] text-slate-500">{label}</Text>
            <Text className="mt-2 text-lg font-black text-white">{value}</Text>
          </View>
        ))}
      </View>
      <View className="mt-6 rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
        <Text className="text-base font-bold text-white">Unlocked mindset</Text>
        <Text className="mt-2 text-sm leading-5 text-slate-400">Break a route into tiny actions. Then look for the pattern that makes those actions unnecessary.</Text>
      </View>
    </ScrollView>
  );
}
