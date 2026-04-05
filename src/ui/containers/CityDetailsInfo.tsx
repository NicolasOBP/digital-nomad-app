import { City } from "@/src/domain/city/City";

import { Box } from "../components/Box";
import { Text } from "../components/Text";

type CityDetailsInfoProps = Pick<City, "name" | "country" | "description">;

export function CityDetailsInfo({
  name,
  country,
  description,
}: CityDetailsInfoProps) {
  return (
    <Box p="padding">
      <Text variant="title28">{name}</Text>
      <Text mt="s2" variant="text18">
        {country}
      </Text>
      <Text mt="s24" variant="text14">
        {description}
      </Text>
    </Box>
  );
}
