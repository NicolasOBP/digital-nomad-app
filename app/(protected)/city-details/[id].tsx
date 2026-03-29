import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable } from "react-native";

import { useSharedValue } from "react-native-reanimated";

import { Divider } from "@/src/components/Divider";
import { Text } from "@/src/components/Text";

import { BottomSheetMap } from "@/src/containers/BottomSheetMap";
import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/containers/CityDetailsTouristAttraction";
import { useCityDetails } from "@/src/data/useCityDetails";
import { Screen } from "@/src/template/Screen";

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { city, error, isLoading } = useCityDetails(id);

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
