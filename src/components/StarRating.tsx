import { Star } from "lucide-react-native";
import { View } from "react-native";

export function StarRating({ earned = 0, size = 16 }: { earned?: number; size?: number }) {
  return <View className="flex-row items-center gap-1">{[0, 1, 2].map((star) => <Star key={star} size={size} color={star < earned ? "#FBBF24" : "#53647c"} fill={star < earned ? "#FBBF24" : "transparent"} />)}</View>;
}