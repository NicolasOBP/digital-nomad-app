import { Text, View } from "react-native";

import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href={{
          pathname: "/city-details/[id]",
          params: { id: 2, name: "Tokio" },
        }}
      >
        Outro jeito
      </Link>

      <Link href={"/city-details/9"}>
        <Text>Navegar para Detalhes 9</Text>
      </Link>
    </View>
  );
}
