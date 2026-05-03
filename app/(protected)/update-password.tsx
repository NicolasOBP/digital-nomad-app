import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdatePasswordForm } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordForm";
import { Screen } from "@/src/ui/template/Screen";

export default function UpdatePasswordScreen() {
  function handleUpdatePassword() {}

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
