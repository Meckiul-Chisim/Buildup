import { Link, useRouter } from "expo-router";
import { ArrowLeft, BookOpen, Gamepad2, Info, LockKeyhole, Moon, Music, SlidersHorizontal, Vibrate, Volume2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

import { SettingsRow } from "@/components/SettingsRow";
import { useAuth } from "@/context/AuthContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const [sound, setSound] = useState(true); const [music, setMusic] = useState(true); const [vibration, setVibration] = useState(false); const [lineNumbers, setLineNumbers] = useState(true);
  const toggle = (value: boolean, setValue: (value: boolean) => void) => <Switch value={value} onValueChange={setValue} trackColor={{ false: "#253146", true: "#34D399" }} thumbColor="#f8fafc" />;
  return <View className="flex-1 bg-[#0B0E14]"><View className="flex-row items-center border-b border-slate-800 px-5 pb-4 pt-14"><Link href="/home" asChild><Pressable><ArrowLeft size={21} color="#f8fafc" /></Pressable></Link><Text className="ml-4 text-xl font-bold text-white">Settings</Text></View><ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}><Section title="Account"><SettingsRow icon={LockKeyhole} label={session?.user.email ?? "Signed in"} onPress={() => undefined} /><SettingsRow icon={ArrowLeft} label="Sign out" onPress={async () => { await signOut(); }} /></Section><Section title="Game"><SettingsRow icon={Volume2} label="Sound" right={toggle(sound, setSound)} /><SettingsRow icon={Music} label="Music" right={toggle(music, setMusic)} /><SettingsRow icon={Vibrate} label="Vibration" right={toggle(vibration, setVibration)} /></Section><Section title="Appearance"><SettingsRow icon={Moon} label="Theme" right={<Text className="text-sm text-slate-400">Dark</Text>} onPress={() => undefined} /><SettingsRow icon={SlidersHorizontal} label="Text Size" right={<Text className="text-sm text-slate-400">Medium</Text>} onPress={() => undefined} /><SettingsRow icon={Gamepad2} label="Show Line Numbers" right={toggle(lineNumbers, setLineNumbers)} /></Section><Section title="About"><SettingsRow icon={BookOpen} label="How to Play" onPress={() => router.push("/how-to-play")} /><SettingsRow icon={LockKeyhole} label="Privacy Policy" onPress={() => undefined} /><SettingsRow icon={Info} label="Version" right={<Text className="text-sm text-slate-500">1.0.0</Text>} /></Section></ScrollView></View>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <View className="mb-6"><Text className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{title}</Text><View className="rounded-2xl border border-slate-700 bg-[#131722] px-3">{children}</View></View>; }