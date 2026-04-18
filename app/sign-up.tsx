import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthSignUp } from "@/src/domain/auth/useCases/useAuthSignUp";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { SignUpForm } from "@/src/ui/containers/SignUpForm/SignUpForm";
import { SignUpSchema } from "@/src/ui/containers/SignUpForm/SignUpSchema";
import { Screen } from "@/src/ui/template/Screen";

export default function SignUpScreen() {
  const { mutate: signUp } = useAuthSignUp({ onSuccess: router.back });

  function handleSignUp(formValues: SignUpSchema) {
    signUp(formValues);
  }
  return (
    <Screen scrollable>
      <SafeAreaView>
        <Header title="Criar conta" />
        <SignUpForm onSubmit={handleSignUp} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
