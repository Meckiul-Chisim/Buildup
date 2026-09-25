import { Link } from "expo-router";
import { ArrowRight, BookOpen, Code2, Info, Layers3 } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { courses } from "@/data/courses";

export default function RootIndexScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#08101f]"
      contentContainerStyle={{ padding: 20, paddingTop: 58, paddingBottom: 40 }}
    >
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]">
          <Code2 size={24} color="#08101f" strokeWidth={3} />
        </View>
        <Text className="ml-3 text-2xl font-black text-white">
          Code<Text className="text-[#34D399]">Quest</Text>
        </Text>
      </View>

      <View className="mt-8">
        <Text className="text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">
          Learn by doing
        </Text>
        <Text className="mt-2 text-3xl font-black text-white">
          Your coding journey
        </Text>
        <Text className="mt-2 text-base leading-6 text-slate-400">
          Start with console.log, master JavaScript, then build real web and API projects.
        </Text>
      </View>

      <View className="mt-7 gap-4">
        {courses.map((course, index) => (
          <Link
            key={course.id}
            href={{ pathname: "/course/[id]", params: { id: course.id } }}
            asChild
          >
            <Pressable className="overflow-hidden rounded-3xl border border-slate-700 bg-[#131722]">
              <View className="h-1.5 bg-[#34D399]" />
              <View className="p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#123329]">
                      <Text className="font-black text-[#34D399]">{index + 1}</Text>
                    </View>
                    <View className="ml-3">
                      <Text className="text-xs font-bold uppercase tracking-[0.16em] text-[#34D399]">
                        {course.level}
                      </Text>
                      <Text className="mt-0.5 text-lg font-black text-white">
                        {course.title}
                      </Text>
                    </View>
                  </View>
                  <ArrowRight size={19} color="#94a3b8" />
                </View>

                <Text className="mt-4 text-sm leading-5 text-slate-400">
                  {course.description}
                </Text>

                <View className="mt-4 flex-row gap-2">
                  <View className="flex-row items-center rounded-full bg-[#0b1d30] px-3 py-2">
                    <BookOpen size={13} color="#94a3b8" />
                    <Text className="ml-2 text-xs font-bold text-slate-300">
                      {course.chapters.length} chapters
                    </Text>
                  </View>
                  <View className="flex-row items-center rounded-full bg-[#0b1d30] px-3 py-2">
                    <Layers3 size={13} color="#94a3b8" />
                    <Text className="ml-2 text-xs font-bold text-slate-300">
                      {course.chapters.reduce((n, chapter) => n + chapter.challenges.length, 0)} challenges
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>

      <Link href="/levels" asChild>
        <Pressable className="mt-5 rounded-2xl border border-slate-700 px-4 py-3">
          <Text className="text-center font-bold text-slate-300">
            Open 3D Practice Lab
          </Text>
        </Pressable>
      </Link>

      <Link href="/how-to-play" asChild>
        <Pressable className="mt-4 flex-row items-center justify-center py-3">
          <Info size={15} color="#93a4b8" />
          <Text className="ml-2 text-sm text-slate-400">How to Play</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}
