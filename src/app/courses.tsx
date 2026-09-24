import { Link } from "expo-router";
import { ArrowRight, BookOpen, Code2, Layers3 } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { courses } from "@/data/courses";

export default function CoursesScreen() {
  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 20, paddingTop: 58, paddingBottom: 40 }}>
      <View className="flex-row items-center"><View className="h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]"><Code2 size={24} color="#08101f" strokeWidth={3} /></View><Text className="ml-3 text-2xl font-black text-white">Code<Text className="text-[#34D399]">Quest</Text></Text></View>
      <Text className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">Learn by doing</Text>
      <Text className="mt-2 text-3xl font-black text-white">Courses</Text>
      <Text className="mt-2 text-base leading-6 text-slate-400">Not just coding puzzles. Learn a skill, play a challenge, then use it to build something real.</Text>

      <View className="mt-6 gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={{ pathname: "/course/[id]", params: { id: course.id } }} asChild>
            <Pressable className="overflow-hidden rounded-3xl border border-slate-700 bg-[#131722]">
              <View className="h-2 bg-[#34D399]" />
              <View className="p-5">
                <View className="flex-row items-center justify-between"><View className="flex-row items-center"><BookOpen size={18} color="#34D399" /><Text className="ml-2 text-xs font-bold uppercase tracking-[0.18em] text-[#34D399]">{course.level}</Text></View><ArrowRight size={19} color="#94a3b8" /></View>
                <Text className="mt-4 text-2xl font-black text-white">{course.title}</Text>
                <Text className="mt-2 text-sm leading-5 text-slate-400">{course.description}</Text>
                <View className="mt-5 flex-row gap-2"><View className="flex-row items-center rounded-full bg-[#0b1d30] px-3 py-2"><Layers3 size={13} color="#94a3b8" /><Text className="ml-2 text-xs font-bold text-slate-300">{course.chapters.length} chapters</Text></View><View className="flex-row items-center rounded-full bg-[#0b1d30] px-3 py-2"><Text className="text-xs font-bold text-slate-300">{course.chapters.reduce((n, c) => n + c.challenges.length, 0)} challenges</Text></View></View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      <Link href="/levels" asChild><Pressable className="mt-5 rounded-2xl border border-slate-700 px-4 py-3"><Text className="text-center font-bold text-slate-300">Open 3D Practice Lab</Text></Pressable></Link>
    </ScrollView>
  );
}
