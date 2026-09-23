import { ChevronRight } from "lucide-react-native";
import type { ComponentType, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = { icon: ComponentType<{ size?: number; color?: string }>; label: string; right?: ReactNode; onPress?: () => void };

export function SettingsRow({ icon: Icon, label, right, onPress }: Props) {
  const content = <View className="flex-row items-center justify-between border-t border-slate-800 py-3.5"><View className="flex-row items-center"><Icon size={17} color="#8ca0b8" /><Text className="ml-3 text-sm text-slate-100">{label}</Text></View><View className="flex-row items-center">{right}{onPress ? <ChevronRight size={16} color="#8ca0b8" /> : null}</View></View>;
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}