import { Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthGetUser } from "@/src/domain/auth/useCases/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/useCases/useAuthSignOut";
import { Box } from "@/src/ui/components/Box";
import { Icon } from "@/src/ui/components/Icon";
import { Text } from "@/src/ui/components/Text";
import { ProfileHeader } from "@/src/ui/containers/Profile/ProfileHeader";
import { Screen } from "@/src/ui/template/Screen";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: authUser } = useAuthGetUser();
  return (
    <Screen>
      <SafeAreaView>
        {authUser && <ProfileHeader authUser={authUser} />}
        <Pressable onPress={signOut}>
          <Box
            mt="s24"
            flexDirection="row"
            alignItems="center"
            alignSelf="center"
          >
            <Icon name="Logout" color="fbErrorSurface" />
            <Text color="fbErrorSurface">Logout</Text>
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
