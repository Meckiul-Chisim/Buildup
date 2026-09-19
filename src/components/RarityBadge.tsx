import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Rarity } from "../types";

interface RarityBadgeProps {
  rarity: Rarity;
  size?: "sm" | "lg";
}

const RARITY_KEYS: Record<Rarity, keyof typeof colors.rarity> = {
  Common: "common",
  Rare: "rare",
  Epic: "epic",
  Legendary: "legendary",
};

// Consistent rarity tag used across shop cards, inventory, and item details.
export default function RarityBadge({ rarity, size = "sm" }: RarityBadgeProps) {
  const color = colors.rarity[RARITY_KEYS[rarity]];
  const small = size === "sm";

  return (
    <View
      style={{ borderColor: color, paddingVertical: small ? 2 : 4 }}
      className="self-start border rounded-full px-2"
    >
      <Text
        style={{ color, fontSize: small ? 10 : 12 }}
        className="font-semibold tracking-wide"
      >
        {rarity}
      </Text>
    </View>
  );
}