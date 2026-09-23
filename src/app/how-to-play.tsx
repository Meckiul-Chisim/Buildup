import { Link } from "expo-router";
import { ArrowLeft, Bot, Target } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

import { CodeEditor } from "@/components/CodeEditor";
import { StarRating } from "@/components/StarRating";

const sample = "robot.moveForward();  // Move ahead\nrobot.turnLeft();      // Turn left\nrobot.turnRight();     // Turn right\nrobot.isWallAhead();   // Check front\nrobot.atGoal();        // Check goal";

export default function HowToPlayScreen() {
  return <View className="flex-1 bg-[#0B0E14]"><View className="flex-row items-center border-b border-slate-800 px-5 pb-4 pt-14"><Link href="/home" asChild><Pressable><ArrowLeft size={21} color="#f8fafc" /></Pressable></Link><Text className="ml-4 text-xl font-bold text-white">How to Play</Text></View><ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}><View className="mb-6 flex-row"><Badge number="1" /><View className="ml-3 flex-1"><Text className="text-lg font-bold text-white">Write JavaScript</Text><Text className="mt-1 text-sm leading-5 text-slate-400">Use the robot object to control your robot. These methods are available.</Text><View className="mt-3"><CodeEditor value={sample} sample /></View></View></View><View className="mb-6 flex-row"><Badge number="2" /><View className="ml-3 flex-1"><Text className="text-lg font-bold text-white">Reach the Goal</Text><Text className="mt-1 text-sm leading-5 text-slate-400">Guide your robot to the green goal tile using the right logic.</Text><View className="mt-4 flex-row items-center justify-center rounded-2xl border border-slate-800 bg-[#131722] py-5"><Bot size={30} color="#34D399" /><Text className="mx-4 text-2xl text-slate-600">→</Text><Target size={30} color="#34D399" /></View></View></View><View className="flex-row"><Badge number="3" /><View className="ml-3 flex-1"><Text className="text-lg font-bold text-white">Complete the Level</Text><Text className="mt-1 text-sm leading-5 text-slate-400">Use the fewest steps possible to earn more stars!</Text><StarRating earned={3} size={23} /></View></View></ScrollView><Link href="/home" asChild><Pressable className="absolute bottom-6 left-5 right-5 rounded-2xl bg-[#34D399] px-4 py-4"><Text className="text-center font-black text-[#0B0E14]">Got it</Text></Pressable></Link></View>;
}

function Badge({ number }: { number: string }) { return <View className="h-8 w-8 items-center justify-center rounded-full bg-[#34D399]"><Text className="font-black text-[#0B0E14]">{number}</Text></View>; }