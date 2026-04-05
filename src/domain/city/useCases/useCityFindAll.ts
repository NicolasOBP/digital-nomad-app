import { useFetchData } from "@/src/data/useFetchData";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

import { CityFindAllFilter } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilter) {
  const { city } = useRepository();

  return useFetchData(() => city.findAll(filters), [filters]);
}
