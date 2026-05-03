import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useCategoryFindAll() {
  const { categories } = useRepository();

  return useAppQuery({
    queryKey: ["category"],
    fetchData: () => categories.findAll(),
  });
}
