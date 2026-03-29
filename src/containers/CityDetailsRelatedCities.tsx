import { ScrollView, useWindowDimensions } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box } from "../components/Box";
import { CityCard } from "../components/CityCard";
import { Text } from "../components/Text";
import { useRelatedCities } from "../data/useRelatedCities";
import { useAppTheme } from "../theme/useAppTheme";
import { City } from "../types";

type Props = Pick<City, "id">;

export function CityDetailsRelatedCities({ id }: Props) {
  const relatedCities = useRelatedCities(id);
  const { spacing } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const cardWidth = width * 0.7;
  const cardHeight = cardWidth * 0.9;

  return (
    <Box style={{ paddingBottom: bottom }}>
      <Text variant="title22" mb="s16" paddingHorizontal="padding">
        Veja Também
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}
      >
        {relatedCities.map((city) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            style={{ width: cardWidth, height: cardHeight }}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
