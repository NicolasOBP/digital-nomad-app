import { router } from "expo-router";
import { ImageBackground, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { City } from "../../domain/city/City";
import { BlackOpacity } from "../components/BlackOpacity";
import { Box } from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { PILL_HEIGHT } from "../components/Pill";

type CityDetailsHeaderProps = Pick<City, "id" | "categories" | "coverImage">;

export function CityDetailsHeader({
  id,
  categories,
  coverImage,
}: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <Box>
      <ImageBackground
        source={
          typeof coverImage === "number" ? coverImage : { uri: coverImage }
        }
        style={{ width: "100%", height: 250 }}
        imageStyle={{ borderBottomRightRadius: 50 }}
      >
        <BlackOpacity />
        <Box
          style={{ paddingTop: top }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="padding"
        >
          <IconButton iconName="Chevron-left" onPress={router.back} />
          <Icon name="Favorite-outline" size={30} color="pureWhite" />
        </Box>
      </ImageBackground>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <Box paddingHorizontal="padding" flexDirection="row" gap="s8">
          {categories.map((category) => (
            <CategoryPill key={category.id} category={category} active={true} />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
