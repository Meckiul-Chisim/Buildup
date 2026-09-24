import { Link } from "expo-router";
import { BookOpen, Code2, Gamepad2, Layers3, Settings } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { courses } from "@/data/courses";
import { levels } from "@/data/levels";
import { useGame } from "@/context/GameContext";

export default function HomeScreen() {
  const { state } = useGame();
  const course = courses[0];
  const total = course.chapters.reduce((n, chapter) => n + chapter.challenges.length, 0);
  const mazeDone = state.completedLevelIds.length;
  const progress = Math.min(100, Math.round((mazeDone / total) * 100));

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-5 pt-14">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]"><Code2 size={23} color="#08101f" strokeWidth={3} /></View>
            <Text className="ml-3 text-2xl font-black text-white">Code<Text className="text-[#34D399]">Quest</Text></Text>
          </View>
          <Link href="/settings" asChild><Pressable className="h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#0c1b31]"><Settings size={18} color="#b6c4d8" /></Pressable></Link>
        </View>

        <Text className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#34D399]">Learning world</Text>
        <Text className="mt-2 text-3xl font-black text-white">Code is the controller.</Text>
        <Text className="mt-2 max-w-[350px] text-base leading-6 text-slate-400">Learn a concept, play a challenge, then use the same skill to build a real web experience.</Text>

        <Link href={{ pathname: "/course/[id]", params: { id: course.id } }} asChild>
          <Pressable className="mt-6 overflow-hidden rounded-[28px] border border-[#1f806e] bg-[#0d2a2c]">
            <View className="p-5">
              <View className="flex-row items-center justify-between"><View className="flex-row items-center"><BookOpen size={16} color="#34D399" /><Text className="ml-2 text-xs font-bold uppercase tracking-[0.18em] text-[#34D399]">Continue course</Text></View><Text className="text-xs font-black text-slate-400">{course.chapters.length} chapters</Text></View>
              <Text className="mt-4 text-2xl font-black text-white">{course.title}</Text>
              <Text className="mt-2 text-sm leading-5 text-slate-400">JavaScript → HTML → CSS → DOM → real projects</Text>
              <View className="mt-5 h-2 overflow-hidden rounded-full bg-[#123b3a]"><View className="h-full rounded-full bg-[#34D399]" style={{ width: `${progress}%` }} /></View>
              <Text className="mt-2 text-xs font-bold text-slate-500">{progress}% practice progress</Text>
            </View>
          </Pressable>
        </Link>
      </View>

      <View className="mx-5 mt-5 flex-row gap-3">
        <Stat label="Chapters" value={String(course.chapters.length)} icon={<Layers3 size={16} color="#34D399" />} />
        <Stat label="Challenges" value={String(total)} icon={<Gamepad2 size={16} color="#a78bfa" />} />
        <Stat label="Maze levels" value={String(levels.length)} icon={<Code2 size={16} color="#fbbf24" />} />
      </View>

      <View className="px-5">
        <Text className="mt-8 text-lg font-black text-white">What makes it different?</Text>
        <View className="mt-3 gap-3">
          <Feature title="Play" body="3D robot mazes turn logic into something you can see and control." icon="01" />
          <Feature title="Build" body="Switch from the maze to a simulated browser and create real page structures." icon="02" />
          <Feature title="Ship" body="The final chapters combine everything into landing pages and dashboards." icon="03" />
        </View>
        <Link href="/courses" asChild><Pressable className="mt-5 rounded-2xl bg-[#34D399] px-4 py-4"><Text className="text-center font-black text-[#08101f]">Explore the full course</Text></Pressable></Link>
        <Link href="/home" asChild><Pressable disabled className="mt-3 rounded-2xl border border-slate-800 px-4 py-3"><Text className="text-center text-xs font-bold text-slate-600">You are on the course dashboard</Text></Pressable></Link>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <View className="flex-1 rounded-2xl border border-slate-800 bg-[#101827] p-3"><View className="flex-row items-center">{icon}<Text className="ml-2 text-xs font-bold text-slate-500">{label}</Text></View><Text className="mt-2 text-xl font-black text-white">{value}</Text></View>;
}

function Feature({ title, body, icon }: { title: string; body: string; icon: string }) {
  return <View className="flex-row rounded-2xl border border-slate-800 bg-[#101827] p-4"><View className="h-9 w-9 items-center justify-center rounded-lg bg-[#162233]"><Text className="text-xs font-black text-[#34D399]">{icon}</Text></View><View className="ml-3 flex-1"><Text className="font-black text-white">{title}</Text><Text className="mt-1 text-xs leading-5 text-slate-500">{body}</Text></View></View>;
}
