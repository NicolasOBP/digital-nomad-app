import { Accordion } from "../components/Accordion";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { City } from "../types";

type Props = Pick<City, "touristAttractions">;

export function CityDetailsTouristAttraction({ touristAttractions }: Props) {
  return (
    <Box p="padding">
      <Text variant="title22" mb="s8">
        Pontos Turísticos
      </Text>
      <Box gap="s8">
        {touristAttractions.map((attraction) => (
          <Accordion
            title={attraction.name}
            description={attraction.description}
            key={attraction.id}
          />
        ))}
      </Box>
    </Box>
  );
}
