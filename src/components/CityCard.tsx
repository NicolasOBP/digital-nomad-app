import { ImageBackground } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { CityPreview } from "../types";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
};

export function CityCard({ cityPreview }: CityCardProps) {
  const { borderRadii } = useAppTheme();
  return (
    <ImageBackground
      source={cityPreview.coverImage}
      style={{ width: "100%", height: 280 }}
      imageStyle={{ borderRadius: borderRadii.cityCard }}
    >
      <Box
        width="100%"
        height="100%"
        backgroundColor="midnightBlack"
        opacity={0.25}
        position="absolute"
      />

      <Box flex={1} padding="s24" justifyContent="space-between">
        <Box
          alignSelf="flex-end"
          padding="s8"
          borderRadius="rounded"
          borderWidth={2}
          borderColor="gray2"
        >
          <Icon name="Favorite-outline" color="text" />
        </Box>

        <Box>
          <Text variant="title28">{cityPreview.name}</Text>
          <Text variant="text16">{cityPreview.country}</Text>
        </Box>
      </Box>
    </ImageBackground>
  );
}
