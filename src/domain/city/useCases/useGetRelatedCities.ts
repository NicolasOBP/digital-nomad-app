import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useGetRelatedCities(id: string) {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["city", "related", id],
    fetchData: () => city.getRelatedCities(id),
  });
}
