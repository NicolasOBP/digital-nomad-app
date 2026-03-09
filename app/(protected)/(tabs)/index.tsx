import { Box } from "@/src/components/Box";
import { Text } from "@/src/components/Text";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      backgroundColor="cardPrimaryBackground"
      flex={1}
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
    </Box>
  );
}
