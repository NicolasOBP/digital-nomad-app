import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/src/ui/components/Button";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { Screen } from "@/src/ui/template/Screen";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  function handleResetPass() {}

  return (
    <Screen>
      <SafeAreaView>
        <Header title="Recuperar Senha" />
        <Text mb="s16">
          Digite o endereço de e-mail associado à sua conta e enviaremos
          instruções para redefinir sua senha
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Seu email"
          errorMessage=""
        />

        <Button title="Enviar link" onPress={handleResetPass} />

        <TextLink
          ctaText="Voltar para o login"
          goBackOnPress
          text="Lembrou sua senha?"
        />

        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
