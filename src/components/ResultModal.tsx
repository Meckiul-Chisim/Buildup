import { Check, RotateCcw, X } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { StarRating } from "./StarRating";
import { StatCard } from "./StatCard";

type Props = { visible: boolean; won: boolean; onRetry: () => void; onNext: () => void; onBackToLevels: () => void; hasNext: boolean; steps?: number; failureReason?: string | null };

export function ResultModal({ visible, won, onRetry, onNext, onBackToLevels, hasNext, steps = 0, failureReason }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-[#020817]/90 px-5">
        <View className="w-full max-w-md rounded-[28px] border border-slate-700 bg-[#0b1a30] p-5">
          <View className={`mx-auto h-20 w-20 items-center justify-center rounded-full border-2 ${won ? "border-[#28e0a4] bg-[#103b3c]" : "border-[#ff5b78] bg-[#3b1b34]"}`}>
            {won ? <Check size={40} color="#28e0a4" strokeWidth={3} /> : <X size={40} color="#ff5b78" strokeWidth={3} />}
          </View>
          <Text className={`mt-5 text-center text-xs font-bold uppercase tracking-[0.22em] ${won ? "text-[#28e0a4]" : "text-[#ff7890]"}`}>
            {won ? "Level complete" : "Try again"}
          </Text>
          <Text className="mt-2 text-center text-3xl font-black text-white">{won ? "Level Complete!" : "Try Again"}</Text>
          <Text className="mt-3 text-center text-sm leading-5 text-slate-400">
            {won ? `You reached the goal in ${steps} step${steps === 1 ? "" : "s"}.` : failureReason ?? "Your robot did not reach the goal."}
          </Text>
          {!won ? <Text className="mt-2 text-center text-xs text-slate-500">Check your code and make sure your logic is correct.</Text> : null}
          {won ? <View className="mt-5 items-center"><StarRating earned={3} size={29} /></View> : null}
          <View className="mt-5"><StatCard steps={steps} best={won ? steps : "--"} failed={!won} /></View>
          <Pressable onPress={won && hasNext ? onNext : onRetry} className="mt-5 flex-row items-center justify-center rounded-2xl bg-[#34D399] px-4 py-4">
            <Text className="font-black text-[#071225]">{won && hasNext ? "Next level" : "Retry"}</Text>
          </Pressable>
          <Pressable onPress={onRetry} className="mt-3 flex-row items-center justify-center rounded-2xl border border-slate-600 px-4 py-3">
            <RotateCcw size={15} color="#c7d3e2" />
            <Text className="ml-2 font-bold text-slate-200">{won ? "Play again" : "View code"}</Text>
          </Pressable>
          {!won ? <><Pressable onPress={onRetry} className="mt-3 flex-row items-center justify-center rounded-2xl bg-[#34D399] px-4 py-3"><RotateCcw size={15} color="#0B0E14" /><Text className="ml-2 font-black text-[#0B0E14]">Retry</Text></Pressable><Pressable onPress={onBackToLevels} className="mt-3 flex-row items-center justify-center rounded-2xl border border-slate-600 px-4 py-3"><Text className="font-bold text-slate-200">← Back to Levels</Text></Pressable></> : null}
        </View>
      </View>
    </Modal>
  );
}