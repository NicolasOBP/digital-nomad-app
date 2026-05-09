import { Category } from "../category/Category";

import { City, CityPreview } from "./City";

export type CityFindAllFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

export type CityToggleFavoriteParams = {
  cityId: string;
  isFavorite: boolean;
};

export interface ICityRepo {
  findAll(filters: CityFindAllFilter): Promise<CityPreview[]>;
  findById(id: CityPreview["id"]): Promise<City>;
  getRelatedCities(cityId: CityPreview["id"]): Promise<CityPreview[]>;
  toggleFavorite(params: CityToggleFavoriteParams): Promise<void>;
}
