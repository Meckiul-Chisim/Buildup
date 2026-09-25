import { useState } from "react";
import { useRouter } from "expo-router";
import { Code2, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("");
    if (!email.trim() || password.length < 6) {
      setMessage("Enter a valid email and a password with at least 6 characters.");
      return;
    }
    setBusy(true);
    if (mode === "signin") {
      const error = await signIn(email, password);
      if (!error) {
        router.replace("/home");
        return;
      }
      setMessage(error);
    } else {
      const result = await signUp(email, password);
      if (!result.error) {
        router.replace("/home");
        return;
      }
      setMessage(result.error);
    }
    setBusy(false);
  }

  return (
    <ScrollView className="flex-1 bg-[#08101f]" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}>
      <View className="items-center">
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#34D399]"><Code2 size={32} color="#08101f" strokeWidth={3} /></View>
        <Text className="mt-5 text-3xl font-black text-white">Buildup</Text>
        <Text className="mt-2 text-center text-sm text-slate-400">Learn JavaScript, JSX and React by building.</Text>
      </View>
      <View className="mt-8 rounded-3xl border border-slate-800 bg-[#101827] p-5">
        <Text className="text-xl font-black text-white">{mode === "signin" ? "Welcome back" : "Create your account"}</Text>
        <Text className="mt-1 text-sm text-slate-500">{mode === "signin" ? "Sign in to continue your learning path." : "Create an account to save your session."}</Text>
        <View className="mt-5 flex-row items-center rounded-2xl border border-slate-700 bg-[#0b1220] px-4">
          <Mail size={18} color="#64748b" /><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Email address" placeholderTextColor="#64748b" className="ml-3 flex-1 py-4 text-white" />
        </View>
        <View className="mt-3 flex-row items-center rounded-2xl border border-slate-700 bg-[#0b1220] px-4">
          <LockKeyhole size={18} color="#64748b" /><TextInput value={password} onChangeText={setPassword} secureTextEntry={!show} placeholder="Password" placeholderTextColor="#64748b" className="ml-3 flex-1 py-4 text-white" />
          <Pressable onPress={() => setShow(v => !v)} className="p-2">{show ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}</Pressable>
        </View>
        {!!message && <Text className="mt-3 rounded-xl bg-[#0b1d30] p-3 text-sm text-slate-300">{message}</Text>}
        <Pressable onPress={submit} disabled={busy} className="mt-5 rounded-2xl bg-[#34D399] px-4 py-4">
          <Text className="text-center font-black text-[#08101f]">{busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}</Text>
        </Pressable>
        <Pressable onPress={() => { setMode(v => v === "signin" ? "signup" : "signin"); setMessage(""); }} className="mt-4 py-2">
          <Text className="text-center text-sm font-bold text-[#34D399]">{mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
