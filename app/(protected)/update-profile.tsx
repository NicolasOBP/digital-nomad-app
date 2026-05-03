import { useLocalSearchParams } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdateProfileForm } from "@/src/ui/containers/UpdateProfileForm/UpdateProfileForm";
import { Screen } from "@/src/ui/template/Screen";

export default function UpdateProfileScreen() {
  const params = useLocalSearchParams<{ fullname: string; email: string }>();

  function handleUpdateProfile() {}

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Atualizar Perfil" />
        <Text mb="s16">
          Mantenha suas informações atualizadas para uma melhor experiência
        </Text>
        <UpdateProfileForm
          onSubmit={handleUpdateProfile}
          defaultValues={{ email: params.email, fullname: params.fullname }}
        />
      </SafeAreaView>
    </Screen>
  );
}
