import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignIn } from "@/src/domain/auth/useCases/useAuthSignIn";
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
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Seu email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Dgite sua senha"
        />

        <Button title="Entrar" onPress={handleSignIn} />
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    height: 60,
    color: "#fff",
    fontSize: 20,
    marginVertical: 16,
  },
});
