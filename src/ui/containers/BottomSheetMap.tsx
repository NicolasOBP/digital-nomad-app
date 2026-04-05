import { useWindowDimensions } from "react-native";

import MapView from "react-native-maps";

import { City } from "@/src/domain/city/City";

import { BottomSheet, BottomSheetProps } from "../components/BottomSheet";
import { Box } from "../components/Box";
import { IconButton } from "../components/IconButton";

type BottomSheetMapProps = BottomSheetProps & {
  location: City["location"];
};

export function BottomSheetMap({
  location,
  ...bottomSheetMapProps
}: BottomSheetMapProps) {
  const { height } = useWindowDimensions();
  return (
    <BottomSheet {...bottomSheetMapProps}>
      <Box
        borderTopLeftRadius="bottomSheetMap"
        borderTopRightRadius="bottomSheetMap"
        overflow="hidden"
      >
        <MapView
          mapType="terrain"
          style={{
            width: "100%",
            height: height * 0.6,
          }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.2,
          }}
        />
      </Box>

      <Box position="absolute" top={0} right={0} padding="padding">
        <IconButton iconName="Close" onPress={bottomSheetMapProps.onPress} />
      </Box>
    </BottomSheet>
  );
}
