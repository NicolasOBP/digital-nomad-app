import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const { send } = useFeedbackService();

  return useAppMutation<AuthUser, { email: string; password: string }>({
    mutateFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => {
      send({
        type: "success",
        message: `signed in as ${authUser.email}`,
      });
    },
    onError: (error) => {
      send({
        type: "error",
        message: `error ${error}`,
      });
    },
  });
}
