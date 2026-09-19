import { useLocalSearchParams, useRouter } from "expo-router";
import { Coins, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../constants/colors";
import { useGame } from "../../context/GameContext";

// Reward is fixed for this UI-only prototype challenge. When a real
// evaluator/backend judge is added, this should come from the challenge
// definition itself rather than being hardcoded here.
const CHALLENGE_REWARD = { xp: 50, coins: 100 };

// UI-only prototype: there's no real code execution engine here yet —
// tapping Submit always shows the reward. Wire this to a real evaluator
// (or a backend judge) when the activity system is built out.
export default function ChallengeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeActivity } = useGame();
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (id) completeActivity(id, CHALLENGE_REWARD.xp, CHALLENGE_REWARD.coins);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Coding Challenge" onBack={() => router.back()} />

      <KeyboardAvoidingView
        className="flex-1 p-4 gap-3"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text className="text-textSecondary">Solve the problem to earn XP.</Text>

        <View className="bg-surface rounded-2xl p-4">
          <Text className="text-textPrimary font-semibold">
            Write a function that returns the sum of two numbers.
          </Text>
        </View>

        <View className="flex-1 bg-surfaceElevated rounded-2xl p-3 border border-border">
          <TextInput
            className="flex-1 text-textPrimary text-sm"
            style={{ fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", textAlignVertical: "top" }}
            multiline
            placeholder={"function sum(a, b) {\n  // your code here\n}"}
            placeholderTextColor={colors.textMuted}
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {!submitted ? (
          <PrimaryButton label="Submit" onPress={handleSubmit} />
        ) : (
          <View className="bg-surface rounded-2xl p-4 gap-3 items-center">
            <Text className="text-lg font-semibold text-textPrimary">Challenge Complete!</Text>
            <View className="flex-row items-center gap-2">
              <Sparkles size={18} color={colors.primary} />
              <Text className="text-textPrimary font-semibold mr-2">+{CHALLENGE_REWARD.xp} XP</Text>
              <Coins size={18} color={colors.coin} />
              <Text className="text-textPrimary font-semibold mr-2">+{CHALLENGE_REWARD.coins} coins</Text>
            </View>
            <PrimaryButton label="Done" onPress={() => router.back()} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}