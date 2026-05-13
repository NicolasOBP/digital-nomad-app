import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAllFavorites } from "@/src/domain/city/useCases/useCityFindAllFavorites";

import { FavoriteCityCard } from "../../components/FavoriteCityCard";
import { useAppTheme } from "../../theme/useAppTheme";

export function FavoriteCityList({
  ListFooterComponent,
  ListHeaderComponent,
}: Pick<
  FlatListProps<CityPreview>,
  "ListFooterComponent" | "ListHeaderComponent"
>) {
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const { data: favoriteList } = useCityFindAllFavorites();

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <FavoriteCityCard cityPreview={item} />;
  }

  return (
    <FlatList
      data={favoriteList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{
        gap: spacing.padding,
        paddingTop: top,
        paddingBottom: spacing.padding,
      }}
    />
  );
}
