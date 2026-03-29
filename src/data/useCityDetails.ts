import { useEffect, useState } from "react";

import { supabaseService } from "../supabase/supabaseService";
import { City } from "../types";

type UseCitiesDetailsReturn = {
  city?: City;
  isLoading: boolean;
  error: unknown;
};

export function useCityDetails(id: string): UseCitiesDetailsReturn {
  const [city, setCity] = useState<City>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  async function fetchData() {
    try {
      setIsLoading(true);

      const city = await supabaseService.findById(id);
      setCity(city);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { city, isLoading, error };
}
