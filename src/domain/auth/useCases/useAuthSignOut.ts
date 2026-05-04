import { useQueryClient } from "@tanstack/react-query";

import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const { removeAuthUser } = useAuth();
  const { auth } = useRepository();
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.clear();
      removeAuthUser();
    },
  });
}
