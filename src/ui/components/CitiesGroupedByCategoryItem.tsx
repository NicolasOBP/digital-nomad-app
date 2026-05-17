import { FlatList, ListRenderItemInfo } from "react-native";

import { CityPreview } from "@/src/domain/city/City";
import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";

import { useAppTheme } from "../theme/useAppTheme";

import { Box } from "./Box";
import { categoryIconMap } from "./CategoryPill";
import { CityCard } from "./CityCard";
import { Icon } from "./Icon";
import { Text } from "./Text";

export function CitiesGroupedByCategoryItem({
  category,
  cities,
}: CitiesGroupedByCategory) {
  const { spacing } = useAppTheme();

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <CityCard cityPreview={item} key={item.id} type="small" disableFavorite />
    );
  }

  return (
    <Box>
      <Box flexDirection="row" ml="s16">
        <Icon name={categoryIconMap[category.code]} color="primary" />
        <Box ml="s12" mb="s16">
          <Text variant="title22">{category.name}</Text>
          <Text variant="text14">{category.description}</Text>
        </Box>
      </Box>

      <FlatList
        data={cities}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: spacing.s16,
          paddingLeft: spacing.s16,
        }}
        renderItem={renderItem}
      />
    </Box>
  );
}
