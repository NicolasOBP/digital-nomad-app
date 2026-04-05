import { useFetchData } from "@/src/data/useFetchData";

import { CityFindAllFilter, ICityRepo } from "../ICityRepo";

export function useCityFindAll(
  filters: CityFindAllFilter,
  repository: ICityRepo,
) {
  return useFetchData(() => repository.findAll(filters), [filters]);
}
