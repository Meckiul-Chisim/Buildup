import { Link } from "expo-router";
import { ArrowRight, BookOpen, Code2, Gamepad2, Layers3, Settings } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { courses } from "@/data/courses";
import { levels } from "@/data/levels";
import { useGame } from "@/context/GameContext";

export default function HomeScreen() {
  const { state } = useGame();

  return (
    <ScrollView
      className="flex-1 bg-[#08101f]"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-14">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]">
              <Code2 size={23} color="#08101f" strokeWidth={3} />
            </View>
            <Text className="ml-3 text-2xl font-black text-white">
              Code<Text className="text-[#34D399]">Quest</Text>
            </Text>
          </View>

          <Link href="/settings" asChild>
            <Pressable className="h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#0c1b31]">
              <Settings size={18} color="#b6c4d8" />
            </Pressable>
          </Link>
        </View>

        <Text className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#34D399]">
          Your learning path
        </Text>
        <Text className="mt-2 text-3xl font-black text-white">
          Learn. Build. Ship.
        </Text>
        <Text className="mt-2 text-base leading-6 text-slate-400">
          Follow the course from JavaScript fundamentals to real websites and projects.
          Write the code yourself and unlock each challenge as you learn.
        </Text>
      </View>

      <View className="mx-5 mt-6 flex-row gap-3">
        <Stat label="Courses" value={String(courses.length)} icon={<BookOpen size={16} color="#34D399" />} />
        <Stat label="Challenges" value={String(courses.reduce((n, c) => n + c.chapters.reduce((m, ch) => m + ch.challenges.length, 0), 0))} icon={<Gamepad2 size={16} color="#a78bfa" />} />
        <Stat label="Maze levels" value={String(levels.length)} icon={<Code2 size={16} color="#fbbf24" />} />
      </View>

      <View className="px-5">
        <Text className="mt-8 text-xl font-black text-white">Courses</Text>
        <Text className="mt-1 text-sm text-slate-500">
          Choose a course and work through its chapters in order.
        </Text>

        <View className="mt-4 gap-4">
          {courses.map((course, index) => {
            const challengeCount = course.chapters.reduce(
              (n, chapter) => n + chapter.challenges.length,
              0,
            );

            return (
              <Link
                key={course.id}
                href={{ pathname: "/course/[id]", params: { id: course.id } }}
                asChild
              >
                <Pressable className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111827]">
                  <View className="h-1.5 bg-[#34D399]" />

                  <View className="p-5">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 flex-row items-start">
                        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#123329]">
                          <Text className="text-base font-black text-[#34D399]">
                            {String(index + 1).padStart(2, "0")}
                          </Text>
                        </View>

                        <View className="ml-3 flex-1">
                          <Text className="text-xs font-bold uppercase tracking-[0.16em] text-[#34D399]">
                            {course.level}
                          </Text>
                          <Text className="mt-1 text-xl font-black text-white">
                            {course.title}
                          </Text>
                        </View>
                      </View>

                      <ArrowRight size={19} color="#94a3b8" />
                    </View>

                    <Text className="mt-4 text-sm leading-5 text-slate-400">
                      {course.description}
                    </Text>

                    <View className="mt-5 flex-row flex-wrap gap-2">
                      <InfoPill
                        icon={<BookOpen size={13} color="#94a3b8" />}
                        text={course.chapters.length + " chapters"}
                      />
                      <InfoPill
                        icon={<Layers3 size={13} color="#94a3b8" />}
                        text={challengeCount + " challenges"}
                      />
                    </View>

                    <View className="mt-4 rounded-xl bg-[#0b1d30] px-4 py-3">
                      <Text className="text-center text-sm font-black text-[#34D399]">
                        Start / Continue course
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </View>

        <View className="mt-7 rounded-2xl border border-slate-800 bg-[#101827] p-4">
          <Text className="text-base font-black text-white">How the learning works</Text>
          <Text className="mt-2 text-sm leading-5 text-slate-500">
            Learn a concept → write your own code → run it → pass the challenge → unlock the next lesson.
          </Text>
          <Text className="mt-3 text-xs font-bold text-slate-600">
            {state.completedLevelIds.length} maze levels completed
          </Text>
        </View>

        <Link href="/levels" asChild>
          <Pressable className="mt-4 rounded-2xl border border-slate-700 px-4 py-3">
            <Text className="text-center font-bold text-slate-300">
              Open 3D Practice Lab
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <View className="flex-1 rounded-2xl border border-slate-800 bg-[#101827] p-3">
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-2 text-xs font-bold text-slate-500">{label}</Text>
      </View>
      <Text className="mt-2 text-xl font-black text-white">{value}</Text>
    </View>
  );
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View className="flex-row items-center rounded-full bg-[#0b1d30] px-3 py-2">
      {icon}
      <Text className="ml-2 text-xs font-bold text-slate-300">{text}</Text>
    </View>
  );
}
