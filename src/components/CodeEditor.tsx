import { MoreHorizontal, Terminal } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

type Props = { value: string; onChangeText?: (value: string) => void; disabled?: boolean; showLineNumbers?: boolean; sample?: boolean };

export function CodeEditor({ value, onChangeText, disabled = false, showLineNumbers = true, sample = false }: Props) {
  const lines = value.split("\n");
  return (
    <View className="overflow-hidden rounded-2xl border border-slate-700 bg-[#131722]">
      <View className="flex-row items-center justify-between border-b border-slate-800 px-3 py-2.5">
        <View className="flex-row items-center"><Terminal size={14} color="#8ca0b8" /><Text className="ml-2 text-xs font-bold text-slate-300">main.js</Text></View>
        <MoreHorizontal size={18} color="#8ca0b8" />
      </View>
      <View className="flex-row px-2 py-3">
        {showLineNumbers ? <View className="w-7 items-end pr-2">{lines.map((_, index) => <Text key={index} className="text-[12px] leading-6 text-slate-600">{index + 1}</Text>)}</View> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!disabled && !sample}
        multiline
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        textAlignVertical="top"
        className="min-h-[132px] flex-1 px-1 text-[13px] leading-6 text-slate-100"
        style={{ fontFamily: "monospace" }}
      />
      </View>
    </View>
  );
}

export function OutputPanel({ text = "Ready..." }: { text?: string }) {
  return <View className="flex-row items-center rounded-xl border border-slate-800 bg-[#0b1220] px-3 py-2"><Text className="font-mono text-xs text-[#34D399]">&gt;_</Text><Text className="ml-2 text-xs text-slate-500">{text}</Text></View>;
}