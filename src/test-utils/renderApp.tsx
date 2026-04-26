import { ThemeProvider } from "@shopify/restyle";
import { renderRouter } from "expo-router/testing-library";
import clonedeep from "lodash.clonedeep";
import merge from "lodash.merge";

import HomeScreen from "@/app/(protected)/(tabs)";
import TabLayout from "@/app/(protected)/(tabs)/_layout";
import ExploreScreen from "@/app/(protected)/(tabs)/explore";
import ProfileScreen from "@/app/(protected)/(tabs)/profile";
import ProtectedLayout from "@/app/(protected)/_layout";
import CityDetailsScreen from "@/app/(protected)/city-details/[id]";
import SignInScreen from "@/app/sign-in";
import SignUpScreen from "@/app/sign-up";

import { AuthContext, AuthProvider } from "../domain/auth/AuthContext";
import { AuthUser } from "../domain/auth/AuthUser";
import { Repositories } from "../domain/Repositories";
import { Toast } from "../infra/feedbackService/adapters/Toast/Toast";
import { ToastFeedback } from "../infra/feedbackService/adapters/Toast/ToastFeedback";
import { FeedbackProvider } from "../infra/feedbackService/FeedbackProvider";
import { InMemoryRepositories } from "../infra/repositories/adapters/inMemory";
import { RepositoryProvider } from "../infra/repositories/RepositoryProvider";
import { inMemoryStorage } from "../infra/storage/adapters/InMemoryStorage";
import { StorageProvider } from "../infra/storage/StorageContex";
import { AppStack } from "../ui/navigation/AppStack";
import theme from "../ui/theme/theme";
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function MockedAuthProvider({ children }: React.PropsWithChildren) {
  const authUser: AuthUser = {
    email: "esse@gmail.com",
    id: "1",
    fullname: "Esse",
  };

  return (
    <AuthContext.Provider
      value={{
        isReady: true,
        authUser,
        removeAuthUser: async () => {},
        saveAuthUser: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function renderApp(options?: {
  isAuthenticated?: boolean;
  repositories?: DeepPartial<Repositories>;
}) {
  const finalRepository: Repositories = merge(
    clonedeep(InMemoryRepositories),
    options?.repositories ?? {},
  );

  const FinalAuthProvider = options?.isAuthenticated
    ? MockedAuthProvider
    : AuthProvider;

  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <StorageProvider storage={inMemoryStorage}>
        <FinalAuthProvider>
          <FeedbackProvider value={ToastFeedback}>
            <RepositoryProvider value={finalRepository}>
              <ThemeProvider theme={theme}>
                {children}
                <Toast />
              </ThemeProvider>
            </RepositoryProvider>
          </FeedbackProvider>
        </FinalAuthProvider>
      </StorageProvider>
    );
  }

  renderRouter(
    {
      _layout: () => <AppStack />,
      "(protected)/_layout": () => <ProtectedLayout />,
      "(protected)/(tabs)/_layout": () => <TabLayout />,
      "(protected)/(tabs)/index": () => <HomeScreen />,
      "(protected)/(tabs)/explore": () => <ExploreScreen />,
      "(protected)/(tabs)/profile": () => <ProfileScreen />,
      "(protected)/city-details/[id]": () => <CityDetailsScreen />,
      "sign-in": () => <SignInScreen />,
      "sign-up": () => <SignUpScreen />,
    },
    { wrapper: Wrapper, initialUrl: "/" },
  );
}
