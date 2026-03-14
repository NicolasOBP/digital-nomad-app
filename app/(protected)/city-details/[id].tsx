import { useLocalSearchParams, useRouter } from "expo-router";

import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/containers/CityDetailsTouristAttraction";
import { Screen } from "@/src/template/Screen";

export default function CityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <CityDetailsHeader />
      <CityDetailsInfo />
      <CityDetailsTouristAttraction />
      <CityDetailsMap />
      <CityDetailsRelatedCities />
    </Screen>
  );
}
