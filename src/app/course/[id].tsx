import { Link, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CheckCircle2, ChevronRight, LockKeyhole } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { challenges, getCourse } from "@/data/courses";
import { useGame } from "@/context/GameContext";

export default function CourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = getCourse(id);
  const { state } = useGame();

  if (!course) return <View className="flex-1 items-center justify-center bg-[#08101f]"><Text className="text-white">Course not found.</Text></View>;

  const completed = new Set(state.completedLevelIds);
  const allChallenges = course.chapters.flatMap((chapter) => chapter.challenges);
  const progress = allChallenges.filter((challengeId) => { const item = challenges.find((entry) => entry.id === challengeId)!; return completed.has(item.kind === "maze" ? item.levelId! : item.id); }).length;

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 20, paddingTop: 56, paddingBottom: 40 }}>
      <Link href="/courses" asChild><Pressable className="mb-6 flex-row items-center"><ArrowLeft size={18} color="#94a3b8" /><Text className="ml-2 text-sm font-bold text-slate-400">All courses</Text></Pressable></Link>
      <Text className="text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">Full course</Text>
      <Text className="mt-2 text-3xl font-black text-white">{course.title}</Text>
      <Text className="mt-2 text-base leading-6 text-slate-400">{course.description}</Text>
      <View className="mt-5 rounded-2xl border border-slate-700 bg-[#131722] p-4">
        <View className="flex-row justify-between"><Text className="text-sm font-bold text-white">Course progress</Text><Text className="text-sm font-black text-[#34D399]">{progress}/{allChallenges.length}</Text></View>
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><View className="h-full rounded-full bg-[#34D399]" style={{ width: `${(progress / allChallenges.length) * 100}%` }} /></View>
      </View>

      <View className="mt-7 gap-4">
        {course.chapters.map((chapter, index) => {
          const done = chapter.challenges.filter((id) => completed.has(id)).length;
          return (
            <View key={chapter.id} className="rounded-3xl border border-slate-700 bg-[#111827] p-4">
              <View className="flex-row items-start">
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#123329]"><Text className="font-black text-[#34D399]">{index + 1}</Text></View>
                <View className="ml-3 flex-1"><Text className="text-lg font-black text-white">{chapter.title}</Text><Text className="mt-1 text-sm text-slate-400">{chapter.subtitle}</Text></View>
                {done === chapter.challenges.length ? <CheckCircle2 size={20} color="#34D399" /> : <Text className="text-xs font-bold text-slate-500">{done}/{chapter.challenges.length}</Text>}
              </View>
              <View className="mt-3 flex-row flex-wrap gap-2">{chapter.skills.map((skill) => <View key={skill} className="rounded-full border border-slate-700 px-2.5 py-1"><Text className="text-[11px] font-bold text-slate-400">{skill}</Text></View>)}</View>
              <View className="mt-4 gap-2">
                {chapter.challenges.map((challengeId, challengeIndex) => {
                  const challenge = challenges.find((entry) => entry.id === challengeId)!;
                  const isDone = completed.has(challenge.kind === "maze" ? challenge.levelId! : challenge.id);
                  const previous = challengeIndex === 0 ? true : completed.has(chapter.challenges[challengeIndex - 1]);
                  return (
                    <Link key={challenge.id} href={challenge.kind === "maze" ? { pathname: "/level/[id]", params: { id: challenge.levelId } } : { pathname: "/challenge/[id]", params: { id: challenge.id } }} asChild>
                      <Pressable className="flex-row items-center rounded-2xl border border-slate-800 bg-[#0b1220] px-3 py-3">
                        <View className={`h-9 w-9 items-center justify-center rounded-lg ${isDone ? "bg-[#123329]" : "bg-[#182233]"}`}><Text className={`text-xs font-black ${isDone ? "text-[#34D399]" : "text-slate-400"}`}>{challengeIndex + 1}</Text></View>
                        <View className="ml-3 flex-1"><Text className="text-sm font-bold text-white">{challenge.title}</Text><Text className="mt-0.5 text-xs text-slate-500">{challenge.lesson}</Text></View>
                        {isDone ? <CheckCircle2 size={17} color="#34D399" /> : previous ? <ChevronRight size={18} color="#64748b" /> : <LockKeyhole size={15} color="#475569" />}
                      </Pressable>
                    </Link>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
