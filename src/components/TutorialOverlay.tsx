import { Image, Modal, Pressable, Text, View } from "react-native";

type Props = { visible: boolean; onClose: () => void };

const steps = [
  {
    number: "01",
    title: "Reach the beacon",
    body: "The glowing ring is your goal. Your robot starts on the blue tile and faces north, toward the beacon.",
  },
  {
    number: "02",
    title: "Write one move",
    body: "The editor contains real JavaScript. Start with robot.moveForward(); to move one tile.",
  },
  {
    number: "03",
    title: "Run and watch",
    body: "Tap Run program. Your code executes once, then the robot animates every recorded action in the 3D maze.",
  },
  {
    number: "04",
    title: "Learn from the result",
    body: "A collision opens the console so you can adjust your code. Later missions introduce turns, loops, and sensing.",
  },
];

export function TutorialOverlay({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/75">
        <View className="rounded-t-[32px] border border-slate-700 bg-[#101a2d] px-5 pb-8 pt-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image source={require("../../assets/images/logo-glow.png")} className="h-12 w-12" resizeMode="contain" />
              <View className="ml-3">
                <Text className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Pilot briefing</Text>
                <Text className="mt-1 text-2xl font-black text-white">Your first mission</Text>
              </View>
            </View>
            <Pressable onPress={onClose} className="rounded-full border border-slate-600 px-3 py-2">
              <Text className="font-bold text-slate-300">Close</Text>
            </Pressable>
          </View>

          <View className="mt-6 gap-3">
            {steps.map((step) => (
              <View key={step.number} className="flex-row rounded-2xl border border-slate-700 bg-[#162843] p-3">
                <Text className="w-10 text-lg font-black text-cyan-300">{step.number}</Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-white">{step.title}</Text>
                  <Text className="mt-1 text-sm leading-5 text-slate-300">{step.body}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable onPress={onClose} className="mt-6 rounded-2xl bg-cyan-300 px-4 py-4">
            <Text className="text-center font-black text-slate-950">Enter the maze</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}