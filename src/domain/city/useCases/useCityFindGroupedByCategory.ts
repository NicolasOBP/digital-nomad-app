import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useCityFindGroupedByCategory() {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["city", "category-grouped"],
    fetchData: () => city.findGroupedByCategory(),
  });
}
