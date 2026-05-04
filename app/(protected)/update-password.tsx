import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthUpdatePassword } from "@/src/domain/auth/useCases/useAuthUpdatePassword";
import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdatePasswordForm } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordForm";
import { UpdatePasswordSchema } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordSchema";
import { Screen } from "@/src/ui/template/Screen";

export default function UpdatePasswordScreen() {
  const { mutate: updatePassword } = useAuthUpdatePassword({
    onSuccess: () => {
      router.back();
    },
  });

  function handleUpdatePassword(data: UpdatePasswordSchema) {
    updatePassword({
      currentPassword: data.currPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Atualizar Senha" />
        <Text mb="s16">
          Recomendamos usar uma combinaão de letras, números e símbolos para
          maior proteção
        </Text>
        <UpdatePasswordForm onSubmit={handleUpdatePassword} />
      </SafeAreaView>
    </Screen>
  );
}
