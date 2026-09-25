import { Link } from "expo-router";
import { ArrowRight, BookOpen, CheckCircle2, Code2, LockKeyhole } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { challenges, courses } from "@/data/courses";
import { useGame } from "@/context/GameContext";

export default function CourseReferenceScreen() {
  const { state } = useGame();
  const course = courses[0];
  const completed = new Set(state.completedLevelIds);
  const total = course.chapters.reduce((n, chapter) => n + chapter.challenges.length, 0);
  const completedCount = course.chapters.reduce(
    (n, chapter) =>
      n +
      chapter.challenges.filter((id) => completed.has(id)).length,
    0,
  );
  const progress = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <ScrollView
      className="flex-1 bg-[#08101f]"
      contentContainerStyle={{ padding: 20, paddingTop: 58, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]">
          <Code2 size={24} color="#08101f" strokeWidth={3} />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">
            Full JavaScript + JSX Course
          </Text>
          <Text className="mt-1 text-2xl font-black text-white">
            Web Developer Journey
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-base leading-6 text-slate-400">
        Learn JavaScript first, then use JSX and React to turn your code into real interfaces.
        Every chapter has lessons and hands-on challenges where you write the code yourself.
      </Text>

      <View className="mt-5 rounded-3xl border border-[#1f806e] bg-[#0d2a2c] p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-bold uppercase tracking-[0.16em] text-[#34D399]">
              Course progress
            </Text>
            <Text className="mt-1 text-2xl font-black text-white">
              {completedCount} / {total} challenges
            </Text>
          </View>
          <Text className="text-2xl font-black text-[#34D399]">{progress}%</Text>
        </View>
        <View className="mt-4 h-2 overflow-hidden rounded-full bg-[#123b3a]">
          <View className="h-full rounded-full bg-[#34D399]" style={{ width: `${progress}%` }} />
        </View>
      </View>

      <View className="mt-7">
        {course.chapters.map((chapter, chapterIndex) => {
          const chapterDone = chapter.challenges.filter((id) => completed.has(id)).length;
          const previousComplete =
            chapterIndex === 0 ||
            course.chapters[chapterIndex - 1].challenges.every((id) => completed.has(id));
          const chapterChallenges = chapter.challenges
            .map((id) => challenges.find((item) => item.id === id))
            .filter(Boolean);

          return (
            <View key={chapter.id} className="mb-5 rounded-3xl border border-slate-800 bg-[#101827] p-4">
              <View className="flex-row items-start">
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#123329]">
                  <Text className="font-black text-[#34D399]">{String(chapterIndex + 1).padStart(2, "0")}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-lg font-black text-white">{chapter.title}</Text>
                  <Text className="mt-1 text-sm text-slate-500">{chapter.subtitle}</Text>
                </View>
                <Text className="text-xs font-black text-slate-500">
                  {chapterDone}/{chapter.challenges.length}
                </Text>
              </View>

              <Text className="mt-4 text-sm leading-5 text-slate-400">{chapter.learn}</Text>

              <View className="mt-3 flex-row flex-wrap gap-2">
                {chapter.skills.map((skill) => (
                  <View key={skill} className="rounded-full border border-slate-700 px-2.5 py-1">
                    <Text className="text-[11px] font-bold text-slate-400">{skill}</Text>
                  </View>
                ))}
              </View>

              <View className="mt-4 gap-2">
                {chapterChallenges.map((challenge, challengeIndex) => {
                  if (!challenge) return null;
                  const isDone = completed.has(challenge.id);
                  const unlocked =
                    previousComplete &&
                    (challengeIndex === 0 ||
                      completed.has(chapter.challenges[challengeIndex - 1]));

                  return (
                    <Link
                      key={challenge.id}
                      href={{ pathname: "/challenge/[id]", params: { id: challenge.id } }}
                      asChild
                    >
                      <Pressable
                        disabled={!unlocked}
                        className={`flex-row items-center rounded-2xl border border-slate-800 bg-[#0b1220] px-3 py-3 ${unlocked ? "" : "opacity-50"}`}
                      >
                        <View className={`h-9 w-9 items-center justify-center rounded-lg ${isDone ? "bg-[#123329]" : "bg-[#182233]"}`}>
                          {isDone ? (
                            <CheckCircle2 size={16} color="#34D399" />
                          ) : (
                            <Text className="text-xs font-black text-slate-400">{challengeIndex + 1}</Text>
                          )}
                        </View>

                        <View className="ml-3 flex-1">
                          <Text className="text-sm font-bold text-white">{challenge.title}</Text>
                          <Text className="mt-0.5 text-xs text-slate-500">{challenge.lesson}</Text>
                        </View>

                        {unlocked ? (
                          <ArrowRight size={17} color="#64748b" />
                        ) : (
                          <LockKeyhole size={15} color="#475569" />
                        )}
                      </Pressable>
                    </Link>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      <View className="rounded-2xl border border-slate-800 bg-[#101827] p-4">
        <BookOpen size={18} color="#34D399" />
        <Text className="mt-3 text-base font-black text-white">What you will learn</Text>
        <Text className="mt-2 text-sm leading-6 text-slate-500">
          JavaScript → logic → loops → functions → HTML → CSS → DOM → debugging → projects → JSX → React components → props → conditional rendering → map().
        </Text>
      </View>
    </ScrollView>
  );
}
