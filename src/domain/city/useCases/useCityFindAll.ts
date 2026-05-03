import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

import { CityFindAllFilter } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilter) {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["city", filters.name, filters.categoryId],
    fetchData: () => city.findAll(filters),
  });
}
