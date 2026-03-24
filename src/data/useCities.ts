import { useEffect, useState } from "react";

import { supabaseService } from "../supabase/supabaseService";
import { Category, CityPreview } from "../types";

type CityFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

type UseCitiesReturn = {
  cities?: CityPreview[];
  isLoading: boolean;
  error: unknown;
};

export function useCities({ categoryId, name }: CityFilter): UseCitiesReturn {
  const [cities, setCities] = useState<CityPreview[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  async function fetchData() {
    try {
      setIsLoading(true);
      const cities = await supabaseService.findAll();

      setCities(cities);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { cities, isLoading, error };
}

// let cityPreviewList = cities;

//   if (name) {
//     cityPreviewList = cityPreviewList.filter((city) => {
//       return city.name.toLowerCase().includes(name.toLowerCase());
//     });
//   }

//   if (categoryId) {
//     cityPreviewList = cityPreviewList.filter((city) => {
//       return city.categories.some((category) => category.id === categoryId);
//     });
//   }
