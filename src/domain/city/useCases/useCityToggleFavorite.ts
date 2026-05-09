import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppMutation } from "@/src/infra/useCases/useAppMutation";

import { CityToggleFavoriteParams } from "../ICityRepo";

export function useCityToggleFavorite() {
  const { city } = useRepository();

  return useAppMutation<void, CityToggleFavoriteParams>({
    mutationFn: (variables) => city.toggleFavorite(variables),
  });
}
