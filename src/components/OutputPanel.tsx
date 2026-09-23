import { Text, View } from "react-native";

type Props = { output: string[]; error: string | null };

export function OutputPanel({ output, error }: Props) {
  if (output.length === 0 && !error) {
    return null;
  }
  return (
    <View className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
      <Text className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Console</Text>
      {output.map((line, index) => <Text key={`${line}-${index}`} className="text-sm text-slate-200">{line}</Text>)}
      {error ? <Text className="mt-1 text-sm text-rose-300">Error: {error}</Text> : null}
    </View>
  );
}