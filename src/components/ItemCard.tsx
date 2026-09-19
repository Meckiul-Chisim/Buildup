import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Item } from "../types";
import ObjectImage from "./ObjectImage";
import RarityBadge from "./RarityBadge";

interface ItemCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

// A single row in the Inventory / My Items list.
export default function ItemCard({ item, onPress }: ItemCardProps) {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="flex-row items-center bg-surface rounded-2xl p-3 gap-3"
    >
      <ObjectImage id={item.id} rarity={item.rarity} size={56} />
      <View className="flex-1 gap-1">
        <Text className="text-textPrimary font-semibold">{item.name}</Text>
        <View className="flex-row items-center gap-2">
          <RarityBadge rarity={item.rarity} />
          {item.level > 0 && (
            <Text className="text-textSecondary text-xs">Lvl {item.level}</Text>
          )}
        </View>
      </View>
      <Text className="text-textSecondary font-semibold mr-1">×{item.quantity}</Text>
      <ChevronRight size={18} color={colors.textMuted} />
    </Pressable>
  );
}