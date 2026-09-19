import { Coins, Gem } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Currency } from "../types";

interface CurrencyDisplayProps {
  type: Currency;
  amount: number;
}

// Small pill showing a coin or gem balance. Reused in the header, shop,
// and item details screens so balances always look the same.
export default function CurrencyDisplay({ type, amount }: CurrencyDisplayProps) {
  const isCoins = type === "coins";
  const color = isCoins ? colors.coin : colors.gem;
  const Icon = isCoins ? Coins : Gem;

  return (
    <View className="flex-row items-center gap-1 bg-surface py-1.5 px-3 rounded-full">
      <Icon size={16} color={color} />
      <Text style={{ color }} className="font-semibold text-[13px]">
        {amount.toLocaleString()}
      </Text>
    </View>
  );
}