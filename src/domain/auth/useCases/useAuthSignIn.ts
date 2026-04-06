import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();

  return useAppMutation<AuthUser, { email: string; password: string }>({
    mutateFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => console.log("success", { authUser }),
    onError: (error) => console.log("error", { error }),
  });
}
