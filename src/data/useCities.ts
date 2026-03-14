import { Category, CityPreview } from "../types";

import { cityPreviewList as cityList } from "./cities";

type CityFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

export function useCities({ categoryId, name }: CityFilter): {
  cityPreviewList: CityPreview[];
} {
  let cityPreviewList = cityList;

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

  return { cityPreviewList };
}
