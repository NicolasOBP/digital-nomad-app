import { CityFilter, supabaseService } from "../supabase/supabaseService";

import { useFetchData } from "./useFetchData";

export function useCities(filters: CityFilter) {
  return useFetchData(() => supabaseService.findAll(filters), [filters]);
}
