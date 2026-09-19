import { ReactNode, useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

type Variant = "primary" | "outline" | "danger";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
  primary: "bg-primary",
  danger: "bg-danger",
  outline: "bg-transparent border border-border",
};

const VARIANT_TEXT: Record<Variant, string> = {
  primary: "text-[#0B0F0C]",
  danger: "text-[#0B0F0C]",
  outline: "text-textPrimary",
};

// Reusable button used for every primary action (Buy, Use, Upgrade, Submit...).
// A small scale-down animation on press gives the "polished mobile game" feel.
export default function PrimaryButton({
  label,
  onPress,
  icon,
  variant = "primary",
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) =>
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }} className={className}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => animateTo(0.96)}
        onPressOut={() => animateTo(1)}
        className={`flex-row items-center justify-center gap-2 rounded-2xl py-3.5 px-6 ${VARIANT_BG[variant]} ${disabled ? "opacity-50" : ""}`}
      >
        {icon}
        <Text className={`text-base font-semibold ${VARIANT_TEXT[variant]}`}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}