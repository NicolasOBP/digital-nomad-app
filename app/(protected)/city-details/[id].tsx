import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable } from "react-native";

import { useSharedValue } from "react-native-reanimated";

import { useCityFindById } from "@/src/domain/city/useCases/useCityFindById";
import { Divider } from "@/src/ui/components/Divider";
import { Text } from "@/src/ui/components/Text";
import { BottomSheetMap } from "@/src/ui/containers/BottomSheetMap";
import { CityDetailsHeader } from "@/src/ui/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/ui/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/ui/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/ui/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/ui/containers/CityDetailsTouristAttraction";
import { Screen } from "@/src/ui/template/Screen";

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: city, error, isLoading } = useCityFindById(id);

  const bottomSheetIsOpen = useSharedValue(false);

  function toggleBottomSheet() {
    bottomSheetIsOpen.value = !bottomSheetIsOpen.value;
  }

  if (error) {
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

  if (isLoading || !city) {
    return <ActivityIndicator size={50} />;
  }

  return (
    <>
      <Screen style={{ paddingHorizontal: 0 }} scrollable>
        <CityDetailsHeader
          id={city.id}
          categories={city.categories}
          coverImage={city.coverImage}
        />

        <CityDetailsInfo
          name={city.name}
          country={city.country}
          description={city.description}
        />

        <Divider paddingHorizontal="padding" />

        <CityDetailsTouristAttraction
          touristAttractions={city.touristAttractions}
        />

        <Divider paddingHorizontal="padding" />

        <Pressable onPress={toggleBottomSheet}>
          <CityDetailsMap location={city.location} />
        </Pressable>

        <Divider paddingHorizontal="padding" />

        <CityDetailsRelatedCities id={city.id} />
      </Screen>

      <BottomSheetMap
        isOpen={bottomSheetIsOpen}
        location={city.location}
        onPress={toggleBottomSheet}
      />
    </>
  );
}
