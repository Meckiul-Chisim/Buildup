import { ArrowLeft, Settings } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../constants/colors";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  onSettingsPress?: () => void;
  right?: ReactNode;
}

// Top bar shared by most screens. Since the Expo Router stack header is
// hidden (`headerShown: false` in _layout.tsx), each screen renders this
// instead — pass `onBack` for a back arrow, or `title` for a simple header.
export default function Header({ title, onBack, onSettingsPress, right }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-3">
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={10} className="p-1">
            <ArrowLeft size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        {title ? (
          <Text className="text-2xl font-bold text-textPrimary">{title}</Text>
        ) : null}
      </View>

      {right ??
        (onSettingsPress ? (
          <Pressable onPress={onSettingsPress} hitSlop={10}>
            <Settings size={22} color={colors.textSecondary} />
          </Pressable>
        ) : null)}
    </View>
  );
}