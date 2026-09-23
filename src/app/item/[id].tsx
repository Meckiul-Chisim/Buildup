import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const commands: Record<string, { name: string; description: string; example: string }> = {
  move: {
    name: "moveForward()",
    description: "Move one grid cell in the direction the robot is facing. A blocked move records a collision.",
    example: "robot.moveForward();",
  },
  left: {
    name: "turnLeft()",
    description: "Rotate the robot 90 degrees counter-clockwise without changing its tile.",
    example: "robot.turnLeft();",
  },
  right: {
    name: "turnRight()",
    description: "Rotate the robot 90 degrees clockwise without changing its tile.",
    example: "robot.turnRight();",
  },
  wall: {
    name: "isWallAhead()",
    description: "Return true when the next tile is outside the level or is a wall.",
    example: "if (robot.isWallAhead()) { robot.turnRight(); }",
  },
  goal: {
    name: "atGoal()",
    description: "Return true when the robot occupies the goal tile.",
    example: "while (!robot.atGoal()) { robot.moveForward(); }",
  },
};

export default function ApiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const command = commands[id] ?? commands.move;

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 24, paddingTop: 58 }}>
      <Text className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Robot API / detail</Text>
      <Text className="mt-4 text-3xl font-black text-white" style={{ fontFamily: "monospace" }}>{command.name}</Text>
      <Text className="mt-4 text-base leading-6 text-slate-300">{command.description}</Text>
      <View className="mt-7 rounded-2xl border border-slate-700 bg-[#101a2d] p-4">
        <Text className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Example</Text>
        <Text className="mt-3 text-sm leading-6 text-cyan-100" style={{ fontFamily: "monospace" }}>{command.example}</Text>
      </View>
      <View className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-300/10 p-4">
        <Text className="text-sm font-bold text-amber-200">Remember</Text>
        <Text className="mt-1 text-sm leading-5 text-amber-100/70">Your whole program runs once before the robot animates its recorded actions.</Text>
      </View>
      <Link href="/(tabs)/items" className="mt-7 text-center font-bold text-cyan-300">View all robot commands</Link>
    </ScrollView>
  );
}
