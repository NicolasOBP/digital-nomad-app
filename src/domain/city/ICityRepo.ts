import { Category } from "../category/Category";

import { City, CityPreview } from "./City";

export type CityFindAllFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

export interface ICityRepo {
  findAll(filters: CityFindAllFilter): Promise<CityPreview[]>;
  findById(id: CityPreview["id"]): Promise<City>;
  getRelatedCities(cityId: CityPreview["id"]): Promise<CityPreview[]>;
}
