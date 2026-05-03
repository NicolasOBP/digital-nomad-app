import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useAuthGetUser() {
  const { auth } = useRepository();

  return useAppQuery({
    queryKey: ["user"],
    fetchData: () => auth.getUser(),
  });
}
