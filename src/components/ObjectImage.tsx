import {
    Armchair,
    Bed,
    BookOpen,
    Coffee,
    Gamepad2,
    Lamp,
    Laptop,
    Leaf,
    LucideIcon,
    Package,
    Sofa,
} from "lucide-react-native";
import { View } from "react-native";
import { colors } from "../constants/colors";
import { Rarity } from "../types";

interface ObjectImageProps {
  id: string;
  rarity?: Rarity;
  size?: number;
}

// We don't have real 3D-rendered object art yet, so every object is shown
// as a clean icon on a soft rarity-tinted rounded square. This keeps a
// consistent, premium placeholder look — swap for real illustrations/sprites
// once art is ready; only this file needs to change.
const ICONS: Record<string, LucideIcon> = {
  "gaming-desk": Laptop,
  sofa: Sofa,
  plant: Leaf,
  laptop: Laptop,
  bookshelf: BookOpen,
  "gaming-console": Gamepad2,
  "coffee-machine": Coffee,
  lamp: Lamp,
  bed: Bed,
  "gaming-chair": Armchair,
  desk: Laptop,
};

const RARITY_KEYS: Record<string, keyof typeof colors.rarity> = {
  Common: "common",
  Rare: "rare",
  Epic: "epic",
  Legendary: "legendary",
};

export default function ObjectImage({
  id,
  rarity = "Common",
  size = 64,
}: ObjectImageProps) {
  const Icon = ICONS[id] ?? Package;
  const tint = colors.rarity[RARITY_KEYS[rarity] ?? "common"];

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: `${tint}22`,
        borderColor: `${tint}55`,
      }}
      className="rounded-2xl border items-center justify-center"
    >
      <Icon size={size * 0.45} color={tint} />
    </View>
  );
}