import { Clock3, Footprints, Gauge } from "lucide-react-native";
import { Text, View } from "react-native";

const icons = { steps: Footprints, best: Gauge, time: Clock3 };

export function StatCard({ steps, best, time, failed = false }: { steps: number; best: string | number; time?: string; failed?: boolean }) {
  const rows: Array<[keyof typeof icons, string, string | number]> = [["steps", "Steps", steps], ["best", "Best", best]];
  if (!failed) rows.push(["time", "Time", time ?? "00:45"]);
  return <View className="rounded-2xl border border-slate-700 bg-[#081529] p-3">{rows.map(([key, label, value], index) => { const Icon = icons[key]; return <View key={key} className={`flex-row items-center justify-between ${index > 0 ? "mt-3" : ""}`}><View className="flex-row items-center"><Icon size={14} color="#8ca0b8" /><Text className="ml-2 text-xs text-slate-400">{label}</Text></View><Text className="text-sm font-bold text-white">{value}</Text></View>; })}</View>;
}