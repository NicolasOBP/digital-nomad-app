import { useState } from "react";
import { Button } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignIn } from "@/src/domain/auth/useCases/useAuthSignIn";
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

        <Button title="Entrar" onPress={handleSignIn} />
      </SafeAreaView>
    </Screen>
  );
}
