import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import Modal from "../../components/Modal";
import PrimaryButton from "../../components/PrimaryButton";
import { CATEGORIES, items } from "../../data/items";
import { Item } from "../../types";

export default function InventoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const ownedItems = useMemo(() => items.filter((i) => i.owned), []);
  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? ownedItems
        : ownedItems.filter((i) => i.category === activeCategory),
    [activeCategory, ownedItems]
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="My Items" />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListHeaderComponent={
          <View className="flex-row flex-wrap gap-2 mb-4">
            {CATEGORIES.map((category) => {
              const active = category === activeCategory;
              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  className={`py-2 px-3 rounded-full ${active ? "bg-primary" : "bg-surface"}`}
                >
                  <Text
                    className={`text-xs ${active ? "text-[#0B0F0C] font-bold" : "text-textSecondary"}`}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        }
        renderItem={({ item }) => <ItemCard item={item} onPress={setSelectedItem} />}
      />

      <Modal
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
      >
        {selectedItem && (
          <View className="gap-2">
            {selectedItem.activity && (
              <PrimaryButton
                label="Use"
                onPress={() => {
                  const id = selectedItem.id;
                  setSelectedItem(null);
                  router.push({ pathname: "/use/[id]", params: { id } });
                }}
              />
            )}
            <PrimaryButton
              label="Upgrade"
              variant="outline"
              onPress={() => {
                const id = selectedItem.id;
                setSelectedItem(null);
                router.push({ pathname: "/upgrade/[id]", params: { id } });
              }}
            />
            <PrimaryButton
              label="View Details"
              variant="outline"
              onPress={() => {
                const id = selectedItem.id;
                setSelectedItem(null);
                router.push({ pathname: "/item/[id]", params: { id } });
              }}
            />
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}