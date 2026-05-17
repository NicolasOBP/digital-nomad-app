import { useRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";
import { useCityFindGroupedByCategory } from "@/src/domain/city/useCases/useCityFindGroupedByCategory";
import { CitiesGroupedByCategoryItem } from "@/src/ui/components/CitiesGroupedByCategoryItem";
import { Divider } from "@/src/ui/components/Divider";
import { Screen } from "@/src/ui/template/Screen";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";

export default function ExploreScreen() {
  const { data: citiesGroupedByCategory } = useCityFindGroupedByCategory();

  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CitiesGroupedByCategory>) {
    return <CitiesGroupedByCategoryItem {...item} />;
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlatList
        ref={flatListRef}
        data={citiesGroupedByCategory}
        renderItem={renderItem}
        keyExtractor={(item) => item.category.id}
        ItemSeparatorComponent={() => <Divider marginHorizontal="s16" />}
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
      />
    </Screen>
  );
}
