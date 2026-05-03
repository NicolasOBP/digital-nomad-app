import { useMutation } from "@tanstack/react-query";

import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const { send } = useFeedbackService();
  const { saveAuthUser } = useAuth();

  const { mutate, error, isPending } = useMutation<
    AuthUser,
    unknown,
    { email: string; password: string }
  >({
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

  return { mutate, error, isPending };

  // return useAppMutation<AuthUser, { email: string; password: string }>({
  //   mutateFn: ({ email, password }) => auth.signIn(email, password),
  //   onSuccess: (authUser) => {
  //     saveAuthUser(authUser);
  //     send({
  //       type: "success",
  //       message: `signed in as ${authUser.email}`,
  //     });
  //   },
  //   onError: (error) => {
  //     send({
  //       type: "error",
  //       message: `erro ao fazer login`,
  //       description: error.message,
  //     });
  //   },
  // });
}
