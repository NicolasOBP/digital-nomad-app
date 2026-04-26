import { City, CityPreview } from "@/src/domain/city/City";
import { CityFindAllFilter, ICityRepo } from "@/src/domain/city/ICityRepo";
import { cities } from "@/src/infra/repositories/adapters/inMemory/data/cities";

export class InMemoryCityRepo implements ICityRepo {
  async findById(id: CityPreview["id"]): Promise<City> {
    const city = cities.find((city) => {
      return city.id === id;
    });

    if (city) {
      return city;
    }

    throw new Error("City not found.");
  }

  async getRelatedCities(cityId: CityPreview["id"]): Promise<CityPreview[]> {
    const city = cities.find((city) => {
      return city.id === cityId;
    });

    return cities.filter((c) => city?.relatedCitiesIds.includes(c.id));
  }

  async findAll({
    categoryId,
    name,
  }: CityFindAllFilter): Promise<CityPreview[]> {
    let cityPreviewList = [...cities];

    if (name) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (categoryId) {
      cityPreviewList = cityPreviewList.filter((city) => {
        return city.categories.some((category) => category.id === categoryId);
      });
    }

    // await new Promise((res) => {
    //   setTimeout(() => {
    //     res("");
    //   }, 2000);
    // });
    // throw new Error("server down");

    return cityPreviewList;
  }
}
