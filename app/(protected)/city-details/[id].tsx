import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function CityDetailsScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={router.back}>
        Cidades - {id} - {name}
      </Text>
    </View>
  );
}
