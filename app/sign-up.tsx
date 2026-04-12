import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { SignUpForm } from "@/src/ui/containers/SignUpForm/SignUpForm";
import { Screen } from "@/src/ui/template/Screen";

export default function SignUpScreen() {
  function handleSignUp() {}
  return (
    <Screen>
      <SafeAreaView>
        <Header title="Criar conta" />
        <SignUpForm onSubmit={handleSignUp} />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
