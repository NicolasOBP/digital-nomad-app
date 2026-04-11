import { useState } from "react";
import { Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignIn } from "@/src/domain/auth/useCases/useAuthSignIn";
import { Button } from "@/src/ui/components/Button";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Screen } from "@/src/ui/template/Screen";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn } = useAuthSignIn();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Screen>
      <SafeAreaView>
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            width: 150,
            height: 60,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 60,
          }}
        />
        <Text alignSelf="center" mb="s16" variant="title22">
          Bem Vindo
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Seu email"
          errorMessage=""
        />
        <TextInput
          label="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Dgite sua senha"
          errorMessage=""
        />

        <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
          Esqueceu sua senha
        </Text>

        <Button title="Entrar" onPress={handleSignIn} />

        <Text alignSelf="center" mt="s16" color="gray2">
          Ainda não tem uma conta?{" "}
          <Text color="primary" variant="title14">
            Criar
          </Text>
        </Text>
      </SafeAreaView>
    </Screen>
  );
}
