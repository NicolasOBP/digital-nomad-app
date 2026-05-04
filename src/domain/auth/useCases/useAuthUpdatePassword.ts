import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/useCases/useAppMutation";

import { AuthupdatePasswordParams } from "../IAuthRepo";

export function useAuthUpdatePassword(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const { send } = useFeedbackService();

  return useAppMutation<void, AuthupdatePasswordParams>({
    mutationFn: (params) => auth.updatePassword(params),
    onSuccess: () => {
      options?.onSuccess?.();
      send({
        message: "Senha atualizada com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      send({
        type: "error",
        message: "Erro ao atualizar senha",
      });
    },
  });
}
