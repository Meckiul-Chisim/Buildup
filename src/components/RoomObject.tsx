import { useRef } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import { Rarity } from "../types";
import ObjectImage from "./ObjectImage";

const { width } = Dimensions.get("window");

interface RoomObjectProps {
  id: string;
  rarity?: Rarity;
  x: number;
  y: number;
  roomHeight: number;
  onPress: (id: string) => void;
}

// A single tappable object placed inside the virtual room on the Home screen.
// Position is given as a fraction (0–1) of the room's width/height so the
// layout adapts to any device size instead of using fixed pixel coordinates.
export default function RoomObject({ id, rarity, x, y, roomHeight, onPress }: RoomObjectProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) =>
    Animated.spring(scale, { toValue: value, useNativeDriver: true, speed: 40, bounciness: 8 }).start();

  const size = 56;
  const left = x * (width - 64); // 64 ~= horizontal padding of the room card
  const top = y * (roomHeight - size);

  return (
    <Animated.View style={{ position: "absolute", left, top, transform: [{ scale }] }}>
      <Pressable
        onPress={() => onPress(id)}
        onPressIn={() => animateTo(1.1)}
        onPressOut={() => animateTo(1)}
      >
        <ObjectImage id={id} rarity={rarity} size={size} />
      </Pressable>
    </Animated.View>
  );
}