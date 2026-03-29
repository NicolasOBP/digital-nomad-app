import { useEffect, useState } from "react";

import { supabaseService } from "../supabase/supabaseService";
import { Category } from "../types";

type UseCitiesReturn = {
  categories: Category[];
  isLoading: boolean;
  error: unknown;
};

export function useCategories(): UseCitiesReturn {
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  async function fetchData() {
    try {
      setIsLoading(true);

      const categories = await supabaseService.listCategories();
      setCategories(categories);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { categories: categories || [], isLoading, error };
}
