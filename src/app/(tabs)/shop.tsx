import { useRouter } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CurrencyDisplay from "../../components/CurrencyDisplay";
import Header from "../../components/Header";
import ShopCard from "../../components/ShopCard";
import { colors } from "../../constants/colors";
import { CATEGORIES, items, specialOffer } from "../../data/items";
import { user } from "../../data/user";
import { Item } from "../../types";

export default function ShopScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  const openItem = (item: Item) =>
    router.push({ pathname: "/item/[id]", params: { id: item.id } });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header
        title="Shop"
        right={
          <View className="flex-row gap-2">
            <CurrencyDisplay type="coins" amount={user.coins} />
            <CurrencyDisplay type="gems" amount={user.gems} />
          </View>
        }
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <>
            {/* Special offer banner */}
            <Pressable className="flex-row items-center gap-3 bg-surface rounded-2xl p-3 mb-4 border border-border">
              <View className="w-11 h-11 rounded-xl bg-primary/10 items-center justify-center">
                <Sparkles size={22} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-textPrimary font-semibold">{specialOffer.title}</Text>
                <Text className="text-textSecondary text-xs mt-0.5">
                  {specialOffer.description}
                </Text>
              </View>
              <CurrencyDisplay type={specialOffer.currency} amount={specialOffer.price} />
            </Pressable>

            {/* Category tabs */}
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
          </>
        }
        renderItem={({ item }) => <ShopCard item={item} onPress={openItem} />}
      />
    </SafeAreaView>
  );
}