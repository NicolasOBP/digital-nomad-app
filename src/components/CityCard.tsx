import { Link } from "expo-router";
import { ImageBackground, ImageBackgroundProps } from "react-native";

import { CityPreview } from "../domain/city/City";
import { useAppTheme } from "../theme/useAppTheme";

import { BlackOpacity } from "./BlackOpacity";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps["style"];
};

export function CityCard({ cityPreview, style }: CityCardProps) {
  const { borderRadii } = useAppTheme();
  return (
    <Link push href={`/city-details/${cityPreview.id}`}>
      <ImageBackground
        source={
          typeof cityPreview.coverImage === "number"
            ? cityPreview.coverImage
            : { uri: cityPreview.coverImage }
        }
        style={[{ width: "100%", height: 280 }, style]}
        imageStyle={{ borderRadius: borderRadii.cityCard }}
      >
        <BlackOpacity />

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
    </Link>
  );
}
