import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const { send } = useFeedbackService();
  const { saveAuthUser } = useAuth();

  return useAppMutation<AuthUser, { email: string; password: string }>({
    mutationFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => {
      saveAuthUser(authUser);
      send({
        type: "success",
        message: `signed in as ${authUser.email}`,
      });
    },
    onError: (error) => {
      send({
        type: "error",
        message: `erro ao fazer login`,
        description: error.message,
      });
    },
  });
}
