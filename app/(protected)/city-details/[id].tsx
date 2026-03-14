import { useLocalSearchParams } from "expo-router";

import { Text } from "@/src/components/Text";

import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/containers/CityDetailsTouristAttraction";
import { useCityDetails } from "@/src/data/useCityDetails";
import { Screen } from "@/src/template/Screen";

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { city } = useCityDetails(id);

  if (!city) {
    return (
      <Screen
        padding="padding"
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Text>City not found</Text>
      </Screen>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <CityDetailsHeader
        id={city.id}
        categories={city.categories}
        coverImage={city.coverImage}
      />
      <CityDetailsInfo />
      <CityDetailsTouristAttraction />
      <CityDetailsMap />
      <CityDetailsRelatedCities />
    </Screen>
  );
}
