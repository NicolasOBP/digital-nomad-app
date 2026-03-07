import { Redirect, Stack } from "expo-router";

const isSignedIn = true;
export default function ProtectedLayout() {
  if (!isSignedIn) {
    return <Redirect href={"/SignIn"} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
