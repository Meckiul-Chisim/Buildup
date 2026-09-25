import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export function BuildupSplash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 8, tension: 55, useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);

  return (
    <View className="flex-1 items-center justify-center bg-[#05060c]">
      <Animated.View style={{ opacity, transform: [{ scale }] }} className="items-center">
        <View className="h-40 w-40 items-center justify-center">
          <View className="absolute h-32 w-24 rounded-[30px] border-[18px] border-white" />
          <View className="absolute left-3 top-[76px] h-12 w-7 rounded-md bg-[#5b4bff]" />
          <View className="absolute left-12 top-[55px] h-16 w-7 rounded-md bg-[#6555ff]" />
          <View className="absolute left-[84px] top-[34px] h-20 w-7 rounded-md bg-[#7163ff]" />
        </View>
        <Text className="mt-3 text-5xl font-black tracking-[-2px] text-white">
          Build<Text className="text-[#6857ff]">up</Text>
        </Text>
        <Text className="mt-3 text-sm font-medium tracking-[4px] text-slate-400">
          LEARN  •  BUILD  •  GROW
        </Text>
      </Animated.View>
    </View>
  );
}
