import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/useCases/useAppMutation";

import { AuthSignUpParams } from "../IAuthRepo";

export function useAuthSignUp(options?: UseAppMutationOptions<void>) {
  const { auth } = useRepository();
  const { send } = useFeedbackService();

  return useAppMutation<void, AuthSignUpParams>({
    mutationFn: (params) => auth.signUp(params),
    onSuccess: () => {
      options?.onSuccess?.();
      send({
        type: "success",
        message: `cadastro feito com sucesso`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      send({
        type: "error",
        message: `error ao cadastrar ${error}`,
      });
    },
  });
}
