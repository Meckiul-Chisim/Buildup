import { Canvas, useThree } from "@react-three/fiber/native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Grid2X2, House, Play, RefreshCcw, Settings, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import { CodeEditor, OutputPanel as CodeOutputPanel } from "@/components/CodeEditor";
import { ResultModal } from "@/components/ResultModal";
import { TutorialOverlay } from "@/components/TutorialOverlay";
import { GoalMarker } from "@/components/scene/GoalMarker";
import { GridFloor } from "@/components/scene/GridFloor";
import { Robot } from "@/components/scene/Robot";
import { Walls } from "@/components/scene/Walls";
import { useGame } from "@/context/GameContext";
import { levels } from "@/data/levels";
import { executeLevel, type ExecutionResult } from "@/game/executor";

function SceneCamera({ level }: { level: (typeof levels)[number] }) {
  const { camera } = useThree();
  useEffect(() => {
    const width = level.grid[0]?.length ?? 1;
    const depth = level.grid.length;
    camera.position.set(Math.max(width, 5), Math.max(depth * 0.7, 5), Math.max(depth, 6));
    camera.lookAt(0, 0, 0);
  }, [camera, level]);
  return null;
}

export default function LevelScreen() {
  const { id: rawId } = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const { dispatch } = useGame();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const level = levels.find((entry) => entry.id === id);
  const resolvedLevel = level ?? levels[0];
  const [code, setCode] = useState(resolvedLevel.starterCode);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [running, setRunning] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [tutorialVisible, setTutorialVisible] = useState(resolvedLevel.id === "first-steps");
  const [paused, setPaused] = useState(false);
  const [showLineNumbers] = useState(true);
  if (!level) {
    return (
      <View className="flex-1 items-center justify-center bg-[#08101f] px-6">
        <Text className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Route unavailable</Text>
        <Text className="mt-3 text-center text-2xl font-black text-white">That level could not be loaded.</Text>
        <Link href="/home" className="mt-6 font-bold text-cyan-300">Back to levels</Link>
      </View>
    );
  }
  const levelIndex = levels.findIndex((entry) => entry.id === level.id);
  const nextLevel = levels[levelIndex + 1];

  const runProgram = () => {
    const nextResult = executeLevel(level, code);
    setResult(nextResult);
    setRunning(true);
    setRunKey((value) => value + 1);
    if (nextResult.won) dispatch({ type: "COMPLETE_LEVEL", levelId: level.id });
  };

  const resetEditor = () => {
    setResult(null);
    setRunning(false);
    setCode(level.starterCode);
  };

  const retryRun = () => {
    setResult(null);
    setRunning(false);
    runProgram();
  };

  return (
    <View className="flex-1 bg-[#08101f]">
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 54, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View className="flex-row items-center justify-between rounded-2xl border border-slate-700 bg-[#131722] px-3 py-2">
          <Pressable onPress={() => setPaused(true)}><X size={20} color="#f8fafc" /></Pressable>
          <View className="flex-row items-center"><CodeEditorIcon /><Text className="ml-2 text-xs font-bold text-slate-300">Level {levelIndex + 1}: {level.name}</Text></View>
          <Text className="text-xs font-bold text-slate-400">0/{result?.actions.length ?? 0}</Text>
        </View>
        <View className="mt-5 flex-row items-end justify-between">
          <View className="flex-1">
            <Text className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Practice Lab</Text>
            <Text className="mt-2 text-3xl font-black text-white">{level.name}</Text>
          </View>
          <Pressable onPress={() => setTutorialVisible(true)} className="ml-3 rounded-xl border border-slate-600 px-3 py-2">
            <Text className="text-xs font-bold text-slate-200">How to play</Text>
          </Pressable>
        </View>
        <Text className="mt-2 text-base leading-6 text-slate-300">{level.description}</Text>

        <View className="mt-5 overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#101a2d]">
          <View className="flex-row items-center justify-between border-b border-slate-700 bg-[#162843] px-4 py-3">
            <Text className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">3D maze</Text>
            <View className="flex-row items-center">
              <View className={`mr-2 h-2 w-2 rounded-full ${running ? "bg-amber-300" : "bg-emerald-300"}`} />
              <Text className="text-xs font-bold text-slate-400">{running ? "ROBOT MOVING" : "READY"}</Text>
            </View>
          </View>
          <View className="h-[310px]">
          <Canvas shadows camera={{ position: [5, 5, 7], fov: 45 }}>
            <SceneCamera level={level} />
            <color attach="background" args={["#101a2d"]} />
            <fog attach="fog" args={["#101a2d", 7, 18]} />
            <ambientLight intensity={1.4} />
            <directionalLight position={[4, 7, 5]} intensity={3} castShadow />
            <GridFloor level={level} />
            <Walls level={level} />
            <GoalMarker level={level} />
            <Robot level={level} actions={result?.actions ?? []} runKey={runKey} playing={running || Boolean(result)} onFinished={() => setRunning(false)} />
          </Canvas>
          </View>
        </View>

        <View className="mt-5 gap-3">
          <CodeEditor value={code} onChangeText={setCode} disabled={running} showLineNumbers={showLineNumbers} />
          <CodeOutputPanel text={result?.output[0] ?? "Ready..."} />
          <View className="flex-row gap-3">
            <Pressable onPress={resetEditor} disabled={running} className="flex-row items-center justify-center rounded-xl border border-slate-600 px-4 py-3"><RefreshCcw size={15} color="#cbd5e1" /><Text className="ml-2 font-bold text-slate-200">Reset</Text></Pressable>
            <Pressable onPress={runProgram} disabled={running} className={`flex-1 flex-row items-center justify-center rounded-xl px-4 py-3 ${running ? "bg-slate-700" : "bg-[#34D399]"}`}><Play size={15} color={running ? "#94a3b8" : "#0B0E14"} fill={running ? "transparent" : "#0B0E14"} /><Text className={`ml-2 font-black ${running ? "text-slate-400" : "text-[#0B0E14]"}`}>{running ? "Running" : "Run"}</Text></Pressable>
          </View>
        </View>
      </ScrollView>
      <ResultModal
        visible={Boolean(result && !running)}
        won={result?.won ?? false}
        onRetry={retryRun}
        onNext={() => nextLevel && router.replace({ pathname: "/level/[id]", params: { id: nextLevel.id } })}
        onBackToLevels={() => router.replace("/home")}
        hasNext={Boolean(nextLevel)}
        steps={result?.actions.length ?? 0}
        failureReason={result?.failureReason ?? null}
      />
      <TutorialOverlay visible={tutorialVisible} onClose={() => setTutorialVisible(false)} />
      <PauseMenu visible={paused} onClose={() => setPaused(false)} onHome={() => router.replace("/")} onLevels={() => router.replace("/home")} onRestart={resetEditor} />
    </View>
  );
}

function CodeEditorIcon() { return <Text className="font-mono text-[#34D399]">&lt;/&gt;</Text>; }

function PauseMenu({ visible, onClose, onHome, onLevels, onRestart }: { visible: boolean; onClose: () => void; onHome: () => void; onLevels: () => void; onRestart: () => void }) {
  return <Modal visible={visible} transparent animationType="fade"><Pressable onPress={onClose} className="flex-1 items-center justify-center bg-black/75 px-6"><Pressable onPress={() => undefined} className="w-full rounded-3xl border border-slate-700 bg-[#131722] p-4"><Pressable onPress={onClose} className="flex-row items-center rounded-xl bg-[#34D399] px-4 py-3"><Play size={16} color="#0B0E14" fill="#0B0E14" /><Text className="ml-3 font-black text-[#0B0E14]">Resume</Text></Pressable><PauseButton icon={RefreshCcw} label="Restart Level" onPress={onRestart} /><PauseButton icon={Grid2X2} label="Change Level" onPress={onLevels} /><PauseButton icon={Settings} label="Settings" onPress={() => undefined} /><PauseButton icon={House} label="Home" onPress={onHome} /></Pressable></Pressable></Modal>;
}

function PauseButton({ icon: Icon, label, onPress }: { icon: typeof RefreshCcw; label: string; onPress: () => void }) { return <Pressable onPress={onPress} className="mt-3 flex-row items-center rounded-xl border border-slate-600 px-4 py-3"><Icon size={16} color="#cbd5e1" /><Text className="ml-3 font-bold text-slate-200">{label}</Text></Pressable>; }