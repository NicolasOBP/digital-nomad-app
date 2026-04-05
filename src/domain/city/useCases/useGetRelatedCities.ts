import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

export function useGetRelatedCities(id: string) {
  const { city } = useRepository();

  return useAppQuery(() => city.getRelatedCities(id));
}
