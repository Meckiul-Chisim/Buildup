import { ScrollView, Text, View } from "react-native";

const api = [
  ["moveForward()", "Move one cell in the current direction."],
  ["turnLeft()", "Rotate 90 degrees counter-clockwise."],
  ["turnRight()", "Rotate 90 degrees clockwise."],
  ["isWallAhead()", "Sense whether the next cell is blocked."],
  ["atGoal()", "Check whether the robot reached the beacon."],
];

export default function RobotApiScreen() {
  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Robot API</Text>
      <Text className="mt-3 text-3xl font-black text-white">Small tools. Big routes.</Text>
      <Text className="mt-2 text-base leading-6 text-slate-300">These are the only controls available inside your program.</Text>
      <View className="mt-7 gap-3">
        {api.map(([name, description]) => (
          <View key={name} className="rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
            <Text className="text-base font-bold text-cyan-200" style={{ fontFamily: "monospace" }}>{name}</Text>
            <Text className="mt-2 text-sm leading-5 text-slate-400">{description}</Text>
          </View>
        ))}
      </View>
      <View className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-300/10 p-4">
        <Text className="text-sm font-bold text-amber-200">Execution note</Text>
        <Text className="mt-1 text-sm leading-5 text-amber-100/70">Programs run once, record their actions, and then play them back in the maze. Calls are capped at 500.</Text>
      </View>
    </ScrollView>
  );
}
