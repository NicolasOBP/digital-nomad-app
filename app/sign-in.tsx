import { Link } from "expo-router";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignIn } from "@/src/domain/auth/useCases/useAuthSignIn";
import { Button } from "@/src/ui/components/Button";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { Screen } from "@/src/ui/template/Screen";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn } = useAuthSignIn();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Screen scrollable>
      <SafeAreaView>
        <Logo />
        <Text alignSelf="center" mb="s16" variant="title22">
          Bem Vindo
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Seu email"
        />
        <TextInput
          label="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholder="Dgite sua senha"
        />

        <Link href={"/reset-password"} asChild>
          <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
            Esqueceu sua senha
          </Text>
        </Link>

        <Button title="Entrar" onPress={handleSignIn} />

        <TextLink
          ctaText="Criar"
          href={"/sign-up"}
          text="Ainda não tem uma conta?"
        />
      </SafeAreaView>
    </Screen>
  );
}
