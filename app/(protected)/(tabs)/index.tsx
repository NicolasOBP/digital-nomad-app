import { CityCard } from "@/src/components/CityCard";
import { Icon } from "@/src/components/Icon";
import { Text } from "@/src/components/Text";
import { cityPreviewList } from "@/src/data/cities";
import { Screen } from "@/src/template/Screen";
import { CityPreview } from "@/src/types";
import { FlatList, ListRenderItemInfo } from "react-native";

export default function HomeScreen() {
  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  return (
    <Screen>
      <Text variant="title28">Barcelona</Text>
      <Icon name="Adventure" color="primary" />
      <FlatList data={cityPreviewList} renderItem={renderItem} />
    </Screen>
  );
}
