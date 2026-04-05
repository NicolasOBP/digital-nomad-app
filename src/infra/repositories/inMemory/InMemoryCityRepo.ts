import { City, CityPreview } from "@/src/domain/city/City";
import { CityFindAllFilter, ICityRepo } from "@/src/domain/city/ICityRepo";

export class InMemoryCityRepo implements ICityRepo {
  findById(id: CityPreview["id"]): Promise<City> {
    throw new Error("Method not implemented.");
  }

  getRelatedCities(cityId: CityPreview["id"]): Promise<CityPreview[]> {
    throw new Error("Method not implemented.");
  }

  async findAll(filters: CityFindAllFilter): Promise<CityPreview[]> {
    return [];
  }
}
