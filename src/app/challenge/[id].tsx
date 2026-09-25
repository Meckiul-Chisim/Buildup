import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, CheckCircle2, Globe, Play, Terminal, Wrench } from "lucide-react-native";
import { useMemo, useState } from "react";
import { courses } from "@/data/courses";
import { Pressable, ScrollView, Text, View } from "react-native";

import { CodeEditor } from "@/components/CodeEditor";
import { getChallenge } from "@/data/courses";
import { useGame } from "@/context/GameContext";

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { dispatch, state } = useGame();
  const challenge = getChallenge(id);
  const [code, setCode] = useState(challenge?.starterCode ?? "");
  const [status, setStatus] = useState<"idle" | "success" | "failed">("idle");
  const [message, setMessage] = useState("Write your code, then run the challenge.");

  const missing = useMemo(() => {
    if (!challenge) return [];
    const source = code.toLowerCase();
    return challenge.expected.filter((token) => !source.includes(token.toLowerCase()));
  }, [challenge, code]);

  if (!challenge) return <View className="flex-1 items-center justify-center bg-[#08101f]"><Text className="text-white">Challenge not found.</Text></View>;

  const completed = state.completedLevelIds.includes(challenge.id);

  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const challengePath = useMemo(() => {
    for (const course of courses) {
      for (const chapter of course.chapters) {
        const index = chapter.challenges.indexOf(challenge?.id ?? "");
        if (index !== -1) {
          return {
            courseId: course.id,
            chapterTitle: chapter.title,
            challengeIndex: index,
            challengeIds: chapter.challenges,
          };
        }
      }
    }
    return null;
  }, [challenge?.id]);

  const nextChallengeId = challengePath
    ? challengePath.challengeIds[challengePath.challengeIndex + 1]
    : undefined;

  const run = async () => {
    if (running) return;
    setRunning(true);
    setStatus("idle");
    setMessage("Running your code...");
    setOutput([]);

    try {
      const source = code.trim();
      if (!source) {
        setStatus("failed");
        setMessage("Write your solution first, then run the challenge.");
        return;
      }

      let captured: string[] = [];

      if (challenge.kind === "terminal" || challenge.kind === "maze") {
        const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
          ...args: string[]
        ) => (...values: unknown[]) => Promise<unknown>;

        const safeConsole = {
          log: (...values: unknown[]) => {
            captured.push(values.map((value) => {
              if (Array.isArray(value)) return value.join(",");
              if (value && typeof value === "object") return JSON.stringify(value);
              return String(value);
            }).join(" "));
          },
        };

        const program = new AsyncFunction("console", `"use strict";\n${source}`);
        await program(safeConsole);
      }

      setOutput(captured);

      const sourceLower = source.toLowerCase();
      const missingNow = challenge.expected.filter(
        (token) => !sourceLower.includes(token.toLowerCase())
      );

      if (missingNow.length > 0) {
        setStatus("failed");
        setMessage(`Still missing: ${missingNow.slice(0, 2).join(" · ")}`);
        return;
      }

      if ((challenge.kind === "terminal" || challenge.kind === "maze") && captured.length === 0) {
        setStatus("failed");
        setMessage("Your code ran, but it did not produce any output. Check your console.log.");
        return;
      }

      setStatus("success");
      setMessage("Run successful. All checks passed.");
      if (!completed) dispatch({ type: "COMPLETE_LEVEL", levelId: challenge.id });
    } catch (error) {
      setStatus("failed");
      setMessage(error instanceof Error ? `Error: ${error.message}` : "Your program stopped with an error.");
    } finally {
      setRunning(false);
    }
  };

  const icon = challenge.kind === "browser" ? <Globe size={15} color="#34D399" /> : challenge.kind === "debug" ? <Wrench size={15} color="#fbbf24" /> : <Terminal size={15} color="#34D399" />;

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ padding: 20, paddingTop: 54, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Link href="/courses" asChild><Pressable className="flex-row items-center"><ArrowLeft size={18} color="#94a3b8" /><Text className="ml-2 text-sm font-bold text-slate-400">Courses</Text></Pressable></Link>
      <View className="mt-6 flex-row items-start"><View className="flex-1"><View className="flex-row items-center">{icon}<Text className="ml-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{challenge.kind} challenge</Text></View><Text className="mt-2 text-4xl font-black text-white">{challenge.title}</Text><Text className="mt-2 text-lg leading-7 text-slate-300">{challenge.objective}</Text></View></View>

      {challenge.kind === "browser" || challenge.kind === "debug" ? (
        <View className="mt-6 overflow-hidden rounded-3xl border border-slate-700 bg-white">
          <View className="flex-row items-center border-b border-slate-200 bg-slate-100 px-4 py-3"><View className="h-2 w-2 rounded-full bg-rose-400" /><View className="ml-1.5 h-2 w-2 rounded-full bg-amber-400" /><View className="ml-1.5 h-2 w-2 rounded-full bg-emerald-400" /><Text className="ml-3 text-xs font-bold text-slate-500">localhost · CodeQuest Browser</Text></View>
          <View className="min-h-[180px] items-center justify-center px-6 py-7">
            {challenge.id.includes("pricing") ? <><Text className="text-2xl font-black text-slate-900">Simple plans.</Text><Text className="mt-2 text-sm text-slate-500">Choose a plan that fits your next project.</Text><View className="mt-5 flex-row gap-2"><PreviewCard title="Starter" /><PreviewCard title="Pro" /><PreviewCard title="Team" /></View></> :
             challenge.id.includes("dashboard") ? <><Text className="text-xl font-black text-slate-900">Analytics</Text><View className="mt-4 w-full gap-2"><View className="h-12 rounded-xl bg-slate-100" /><View className="h-20 rounded-xl bg-slate-100" /></View></> :
             <><Text className="text-2xl font-black text-slate-900">{challenge.kind === "debug" ? "Broken Page" : "Your Website"}</Text><Text className="mt-2 text-center text-sm text-slate-500">This browser preview updates as you learn the structure behind real websites.</Text><View className="mt-5 rounded-xl bg-slate-100 px-4 py-3"><Text className="text-center text-xs font-bold text-slate-500">{missing.length === 0 ? "Preview checks passed" : "Waiting for your code..."}</Text></View></>}
          </View>
        </View>
      ) : (
        <View className="mt-6 rounded-3xl border border-slate-700 bg-[#101827] p-5"><Text className="text-xs font-bold uppercase tracking-[0.18em] text-[#34D399]">Terminal</Text><Text className="mt-3 font-mono text-sm text-slate-300">&gt; CodeQuest checker</Text><Text className="mt-2 font-mono text-sm text-slate-500">Waiting for your program...</Text></View>
      )}

      <View className="mt-5"><CodeEditor value={code} onChangeText={setCode} showLineNumbers /></View>
      <View className="mt-3 rounded-xl border border-slate-800 bg-[#0b1220] px-4 py-3">
        <View className="flex-row items-center">
          <View className={`h-2.5 w-2.5 rounded-full ${status === "success" ? "bg-[#34D399]" : status === "failed" ? "bg-rose-400" : "bg-slate-500"}`} />
          <Text className="ml-2 flex-1 text-base leading-6 text-slate-300">{message}</Text>
          {status === "success" ? <CheckCircle2 size={18} color="#34D399" /> : null}
        </View>
        {output.length > 0 ? (
          <View className="mt-3 rounded-lg bg-[#070c15] px-3 py-2">
            <Text className="text-xs font-bold uppercase tracking-[0.12em] text-[#34D399]">Output</Text>
            {output.map((line, index) => <Text key={index} className="mt-1 font-mono text-sm text-slate-200">{line}</Text>)}
          </View>
        ) : null}
      </View>

      <Pressable
        onPress={run}
        disabled={running}
        className={`mt-4 flex-row items-center justify-center rounded-2xl px-4 py-5 ${running ? "bg-emerald-900" : "bg-[#34D399]"}`}
      >
        <Play size={18} color={running ? "#94a3b8" : "#08101f"} fill={running ? "#94a3b8" : "#08101f"} />
        <Text className={`ml-2 text-base font-black ${running ? "text-slate-400" : "text-[#08101f]"}`}>
          {running ? "Running..." : "Run Challenge"}
        </Text>
      </Pressable>

      {status === "success" ? (
        <View className="mt-3 gap-3">
          {nextChallengeId ? (
            <Pressable
              onPress={() => router.push({ pathname: "/challenge/[id]", params: { id: nextChallengeId } })}
              className="flex-row items-center justify-center rounded-2xl bg-[#123329] px-4 py-4"
            >
              <Text className="text-base font-black text-[#34D399]">Next Challenge</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => router.push({ pathname: "/course/[id]", params: { id: challengePath?.courseId ?? "web-developer" } })}
            className="rounded-2xl border border-slate-700 px-4 py-4"
          >
            <Text className="text-center text-base font-bold text-slate-300">Back to Course</Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

function PreviewCard({ title }: { title: string }) {
  return <View className="w-20 rounded-xl border border-slate-200 bg-white p-3"><Text className="text-xs font-black text-slate-800">{title}</Text><View className="mt-3 h-2 rounded-full bg-slate-100" /><View className="mt-2 h-2 w-2/3 rounded-full bg-slate-100" /></View>;
}
