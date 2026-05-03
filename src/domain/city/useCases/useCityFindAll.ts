import { useQuery } from "@tanstack/react-query";

import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

import { CityFindAllFilter } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilter) {
  const { city } = useRepository();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["city", filters.name, filters.categoryId],
    queryFn: () => city.findAll(filters),
  });

  return {
    data,
    error,
    isLoading,
    isFetching,
  };

  // return useAppQuery(
  //   () => city.findAll(filters),
  //   [filters.name, filters.categoryId],
  // );
}
