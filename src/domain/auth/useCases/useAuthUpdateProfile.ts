import { useQueryClient } from "@tanstack/react-query";

import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/useCases/useAppMutation";

import { AuthUpdateProfileParams } from "../IAuthRepo";

export function useAuthUpdateProfile(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const { send } = useFeedbackService();
  const queryClient = useQueryClient();

  return useAppMutation<void, AuthUpdateProfileParams>({
    mutationFn: (params) => auth.updateProfile(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      options?.onSuccess?.();
      send({
        message: "Perfil atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      send({
        type: "error",
        message: "Erro ao atualizar perfil",
      });
    },
  });
}
