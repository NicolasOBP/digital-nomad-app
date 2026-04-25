import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppQuery } from "@/src/infra/useCases/useAppQuery";

import { CityFindAllFilter } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilter) {
  const { city } = useRepository();

  return useAppQuery(
    () => city.findAll(filters),
    [filters.name, filters.categoryId],
  );
}
