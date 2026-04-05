import { useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";

import { useScrollToTop } from "@react-navigation/native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCategoryFindAll } from "@/src/domain/category/useCases/useCategoryFindAll";
import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAll } from "@/src/domain/city/useCases/useCityFindAll";
import { Box } from "@/src/ui/components/Box";
import { CityCard } from "@/src/ui/components/CityCard";
import { CityFilter } from "@/src/ui/containers/CityFilter";
import { Screen } from "@/src/ui/template/Screen";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";
import { useDebounce } from "@/src/utils/hooks/useDebounce";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const debouncedCityName = useDebounce(cityName);
  const { data: cities } = useCityFindAll({
    name: debouncedCityName,
    categoryId: selectedCategoryId,
  });
  const { data: categories } = useCategoryFindAll();

  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="padding">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        data={cities}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </Screen>
  );
}
