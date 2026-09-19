import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import { Item } from "../types";
import CurrencyDisplay from "./CurrencyDisplay";
import ObjectImage from "./ObjectImage";
import RarityBadge from "./RarityBadge";

interface ShopCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

// A single product tile in the Shop grid.
export default function ShopCard({ item, onPress }: ShopCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) =>
    Animated.spring(scale, { toValue: value, useNativeDriver: true, speed: 40, bounciness: 6 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }} className="w-[48%]">
      <Pressable
        onPress={() => onPress(item)}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        className="bg-surface rounded-2xl p-3 items-start gap-2"
      >
        <ObjectImage id={item.id} rarity={item.rarity} size={72} />
        <Text className="text-textPrimary font-semibold" numberOfLines={1}>
          {item.name}
        </Text>
        <RarityBadge rarity={item.rarity} />
        <CurrencyDisplay type={item.currency} amount={item.price} />
      </Pressable>
    </Animated.View>
  );
}