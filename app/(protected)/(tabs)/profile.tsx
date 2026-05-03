import { Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthGetUser } from "@/src/domain/auth/useCases/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/useCases/useAuthSignOut";
import { Box } from "@/src/ui/components/Box";
import { Icon } from "@/src/ui/components/Icon";
import { Text } from "@/src/ui/components/Text";
import { Screen } from "@/src/ui/template/Screen";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: user } = useAuthGetUser();

  console.log({ user });

  return (
    <Screen>
      <SafeAreaView>
        <Text>Profile Screen</Text>
        <Pressable onPress={signOut}>
          <Box flexDirection="row" alignItems="center">
            <Text>Logout</Text>
            <Icon name="Logout" color="primary" />
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
