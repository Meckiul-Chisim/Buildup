import { Link } from "expo-router";
import { ArrowLeft, ChevronRight, LockKeyhole, Star } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { levels } from "@/data/levels";
import { useGame } from "@/context/GameContext";

export default function LevelsScreen() {
  const { state } = useGame();
  const furthest = Math.max(
    -1,
    ...state.completedLevelIds.map((id) =>
      levels.findIndex((level) => level.id === id),
    ),
  );

  return (
    <ScrollView
      className="flex-1 bg-[#08101f]"
      contentContainerStyle={{
        padding: 20,
        paddingTop: 56,
        paddingBottom: 40,
      }}
    >
      <Link href="/home" asChild>
        <Pressable className="flex-row items-center">
          <ArrowLeft size={18} color="#94a3b8" />
          <Text className="ml-2 text-sm font-bold text-slate-400">
            Dashboard
          </Text>
        </Pressable>
      </Link>

      <Text className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#34D399]">
        Buildup Course
      </Text>
      <Text className="mt-2 text-3xl font-black text-white">
        JavaScript Developer Path
      </Text>
      <Text className="mt-2 text-base leading-6 text-slate-400">
        Learn by writing code: console.log → logic → loops → functions → data → web → async → APIs → projects.
      </Text>

      <View className="mt-6 gap-3">
        {levels.map((level, index) => {
          const unlocked = index <= furthest + 1;
          const completed = state.completedLevelIds.includes(level.id);

          const cardClassName = unlocked
            ? "flex-row items-center rounded-2xl border border-slate-700 bg-[#0c1b31] p-4"
            : "flex-row items-center rounded-2xl border border-slate-800 bg-[#0b1220] p-4 opacity-45";

          const numberClassName = completed
            ? "text-lg font-black text-[#34D399]"
            : "text-lg font-black text-slate-300";

          return (
            <Link
              key={level.id}
              href={{
                pathname: "/level/[id]",
                params: { id: level.id },
              }}
              asChild
            >
              <Pressable disabled={!unlocked} className={cardClassName}>
                <View
                  className={
                    completed
                      ? "h-12 w-12 items-center justify-center rounded-xl bg-[#123329]"
                      : "h-12 w-12 items-center justify-center rounded-xl bg-[#12243c]"
                  }
                >
                  <Text className={numberClassName}>{index + 1}</Text>
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-black text-white">
                    {level.name}
                  </Text>
                  <Text className="mt-1 text-xs leading-4 text-slate-500">
                    {level.description}
                  </Text>

                  <Text className="mt-2 text-[11px] font-bold text-emerald-300">{level.challenge?.chapter ?? "Robot Lab"}</Text>

                  <View className="mt-2 flex-row items-center">
                    {[0, 1, 2].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        color={completed ? "#fbbf24" : "#53647c"}
                        fill={completed ? "#fbbf24" : "transparent"}
                      />
                    ))}
                    <Text className="ml-2 text-[11px] font-bold text-slate-500">
                      {completed
                        ? "Completed"
                        : unlocked
                          ? "Available"
                          : "Locked"}
                    </Text>
                  </View>
                </View>

                {unlocked ? (
                  <ChevronRight size={19} color="#7890aa" />
                ) : (
                  <LockKeyhole size={16} color="#53647c" />
                )}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
}
