import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { colors } from "../constants/colors";

interface ProgressBarProps {
  progress: number; // 0–1
  color?: string;
  trackColor?: string;
  height?: number;
}

// Generic animated progress bar used for XP, missions, and upgrade previews.
export default function ProgressBar({
  progress,
  color = colors.primary,
  trackColor = colors.surfaceElevated,
  height = 8,
}: ProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 500,
      useNativeDriver: false, // width isn't supported by the native driver
    }).start();
  }, [progress]);

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{ height, backgroundColor: trackColor }}
      className="w-full rounded-full overflow-hidden"
    >
      <Animated.View
        style={{ width: widthInterpolated, height, backgroundColor: color }}
        className="rounded-full"
      />
    </View>
  );
}