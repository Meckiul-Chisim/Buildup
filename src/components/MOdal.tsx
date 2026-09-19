import { X } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Modal as RNModal, Text, View } from "react-native";
import { colors } from "../constants/colors";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// Shared bottom-sheet-style modal used for object interaction panels,
// purchase confirmations, and upgrade confirmations.
export default function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{ backgroundColor: colors.overlay }}
        className="flex-1 justify-end"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-surfaceElevated rounded-t-3xl p-4 pb-8 gap-3"
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-textPrimary">{title}</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <X size={20} color={colors.textSecondary} />
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}