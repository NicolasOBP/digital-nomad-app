import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const { removeAuthUser } = useAuth();
  const { auth } = useRepository();
  return useAppMutation({
    mutateFn: () => auth.signOut(),
    onSuccess: () => {
      removeAuthUser();
    },
  });
}
