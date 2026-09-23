import { Canvas } from "@react-three/fiber/native";
import { Link } from "expo-router";
import { Code2, Info } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { GoalMarker } from "@/components/scene/GoalMarker";
import { GridFloor } from "@/components/scene/GridFloor";
import { Robot } from "@/components/scene/Robot";
import { Walls } from "@/components/scene/Walls";
import { levels } from "@/data/levels";

export default function RootIndexScreen() {
  const level = levels[0];
  return <View className="flex-1 bg-[#0B0E14] px-6 pt-16"><View className="flex-1 items-center justify-center"><View className="h-20 w-20 items-center justify-center rounded-full bg-[#123329] shadow-lg"><Code2 size={45} color="#34D399" strokeWidth={2.5} /></View><Text className="mt-5 text-4xl font-black text-white">Code<Text className="text-[#34D399]">Quest</Text></Text><Text className="mt-2 text-sm font-medium tracking-[0.18em] text-slate-400">Think · Code · Move</Text><View className="mt-8 h-[210px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#131722]"><Canvas camera={{ position: [4, 4, 6], fov: 42 }}><color attach="background" args={["#131722"]} /><ambientLight intensity={1.6} /><directionalLight position={[4, 6, 5]} intensity={3} /><GridFloor level={level} /><Walls level={level} /><GoalMarker level={level} /><Robot level={level} actions={[]} runKey={0} playing={false} onFinished={() => undefined} /></Canvas></View><Text className="mt-7 max-w-[280px] text-center text-sm leading-5 text-slate-400">Write JavaScript to guide your robot through the maze.</Text></View><Link href="/(tabs)" asChild><Pressable className="mb-4 rounded-2xl bg-[#34D399] px-5 py-4"><Text className="text-center text-base font-black text-[#0B0E14]">Start</Text></Pressable></Link><Link href="/how-to-play" asChild><Pressable className="mb-6 flex-row items-center justify-center py-3"><Info size={15} color="#93a4b8" /><Text className="ml-2 text-sm text-slate-400">How to Play</Text></Pressable></Link></View>;
}
