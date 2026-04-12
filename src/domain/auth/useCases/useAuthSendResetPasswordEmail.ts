import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "@/src/infra/useCases/useAppMutation";

export function useAuthSendResetPasswordEmail(
  options?: UseAppMutationOptions<void>,
) {
  const { auth } = useRepository();
  const { send } = useFeedbackService();

  return useAppMutation<void, { email: string }>({
    mutateFn: ({ email }) => auth.sendResetPasswordEmail(email),
    onSuccess: () => {
      options?.onSuccess?.();
      send({
        type: "success",
        message: `verifique sua caixa de email`,
      });
    },
    onError: (error) => {
      options?.onError?.(error);
      send({
        type: "error",
        message: `error ${error}`,
      });
    },
  });
}
