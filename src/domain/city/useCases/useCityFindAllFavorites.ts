import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useCityFindAllFavorites() {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["city", "favorite"],
    fetchData: () => city.findAllFavorites(),
  });
}
