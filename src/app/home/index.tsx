import { Canvas } from "@react-three/fiber/native";
import { Link } from "expo-router";
import { ChevronRight, Code2, LockKeyhole, Settings, Star } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { GoalMarker } from "@/components/scene/GoalMarker";
import { GridFloor } from "@/components/scene/GridFloor";
import { Robot } from "@/components/scene/Robot";
import { Walls } from "@/components/scene/Walls";
import { useGame } from "@/context/GameContext";
import { levels } from "@/data/levels";

export default function HomeScreen() {
  const { state } = useGame();
  const furthest = Math.max(-1, ...state.completedLevelIds.map((id) => levels.findIndex((level) => level.id === id)));
  return (
    <ScrollView className="flex-1 bg-[#071225]" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="px-5 pt-14">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#28e0a4]">
              <Code2 size={25} color="#071225" strokeWidth={3} />
            </View>
            <Text className="ml-3 text-2xl font-black text-white">Code<Text className="text-[#28e0a4]">Quest</Text></Text>
          </View>
          <Link href="/settings" asChild><Pressable className="h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#0c1b31]">
            <Settings size={18} color="#b6c4d8" />
          </Pressable></Link>
        </View>
        <Text className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#28e0a4]">Training deck</Text>
        <Text className="mt-2 text-3xl font-black text-white">Select a level</Text>
        <Text className="mt-2 text-sm leading-5 text-slate-400">Write code. Guide your robot. Master the maze.</Text>
      </View>

      <View className="mx-5 mt-5 h-[180px] overflow-hidden rounded-[28px] border border-[#1f806e] bg-[#0b1d30]">
        <Canvas camera={{ position: [4.8, 4.8, 6.4], fov: 42 }}>
          <color attach="background" args={["#0b1d30"]} />
          <ambientLight intensity={1.6} />
          <directionalLight position={[4, 7, 5]} intensity={3} />
          <GridFloor level={levels[0]} />
          <Walls level={levels[0]} />
          <GoalMarker level={levels[0]} />
          <Robot level={levels[0]} actions={[]} runKey={0} playing={false} onFinished={() => undefined} />
        </Canvas>
        <View className="absolute bottom-3 left-4 rounded-full border border-[#2bdba7]/40 bg-[#071225]/80 px-3 py-1.5">
          <Text className="text-xs font-bold text-[#b9ffe9]">3D TRAINING SIMULATION</Text>
        </View>
      </View>

      <View className="mx-5 mt-6 gap-3">
        {levels.map((level, index) => (
          <Link key={level.id} href={{ pathname: "/level/[id]", params: { id: level.id } }} asChild disabled={index > furthest + 1}>
            <Pressable disabled={index > furthest + 1} className={`flex-row items-center rounded-2xl border p-3.5 ${index === furthest + 1 ? "border-[#20c994] bg-[#103b3c]" : "border-slate-700 bg-[#0c1b31]"} ${index > furthest + 1 ? "opacity-45" : ""}`}>
              <View className={`h-12 w-12 items-center justify-center rounded-xl ${index === 0 ? "bg-[#28e0a4]" : "bg-[#12243c]"}`}>
                <Text className={`text-xl font-black ${index === 0 ? "text-[#071225]" : "text-slate-300"}`}>{index + 1}</Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-bold text-white">{index === 0 ? "Getting Started" : level.name}</Text>
                <View className="mt-1 flex-row items-center">
                  {[0, 1, 2].map((star) => <Star key={star} size={13} color={index < 2 ? "#ffd35c" : "#53647c"} fill={index < 2 ? "#ffd35c" : "transparent"} />)}
                  <Text className="ml-2 text-xs text-slate-400">{index === 0 ? "Start here" : "Practice route"}</Text>
                </View>
              </View>
              {index <= furthest + 1 ? <ChevronRight size={20} color={index === furthest + 1 ? "#34D399" : "#7890aa"} /> : <LockKeyhole size={16} color="#53647c" />}
            </Pressable>
          </Link>
        ))}
      </View>
      <Text className="mt-6 text-center text-xs text-slate-500">Complete levels to unlock new robot logic.</Text>
    </ScrollView>
  );
}