import MapView from "react-native-maps";

import { City } from "@/src/domain/city/City";

import { Box } from "../components/Box";
import { Text } from "../components/Text";

type Props = Pick<City, "location">;

export function CityDetailsMap({ location }: Props) {
  return (
    <Box p="padding">
      <Text variant="title22" mb="s16">
        Mapa
      </Text>
      <Box borderRadius="default" overflow="hidden">
        <MapView
          style={{
            width: "100%",
            height: 200,
          }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </Box>
    </Box>
  );
}
