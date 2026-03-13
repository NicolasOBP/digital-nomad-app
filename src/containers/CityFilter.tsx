import { ScrollView } from "react-native";
import { Box } from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { SearchInput } from "../components/SearchInput";
import { Category } from "../types";

type CityFilterProps = {
  categories: Category[];
  cityName: string;
  onChangeCityName: React.Dispatch<React.SetStateAction<string>>;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
};

export function CityFilter({
  categories,
  cityName,
  onChangeCityName,
  selectedCategoryId,
  onChangeSelectedCategoryId,
}: CityFilterProps) {
  return (
    <Box>
      <Box paddingHorizontal="padding">
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder="Qual seu próximo destino"
        />
      </Box>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box mt="s16" paddingHorizontal="padding" flexDirection="row" gap="s8">
          {categories.map((category) => (
            <CategoryPill
              active={category.id === selectedCategoryId}
              category={category}
              key={category.id}
              onPress={() =>
                onChangeSelectedCategoryId(
                  category.id === selectedCategoryId ? null : category.id,
                )
              }
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
