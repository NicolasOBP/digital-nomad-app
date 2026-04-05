import { Category } from "@/src/domain/category/Category";
import { City, CityPreview } from "@/src/domain/city/City";
import { ICityRepo } from "@/src/domain/city/ICityRepo";

import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

export type CityFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

async function findAll(filters: CityFilter): Promise<CityPreview[]> {
  try {
    const field = "id,name,country,cover_image";

    let cities = null;
    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(field)
        .eq("category_id", filters.categoryId)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    } else {
      const { data } = await supabase
        .from("cities")
        .select(field)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    }

    if (!cities) {
      throw new Error("data is not available");
    }

    return supabaseAdapter.toCityPreview(cities);
  } catch (error) {
    throw error;
  }
}

async function findById(id: CityPreview["id"]): Promise<City> {
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("City not found");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(
  cityId: CityPreview["id"],
): Promise<CityPreview[]> {
  const { data } = await supabase
    .from("related_cities")
    .select("*")
    .eq("source_city_id", cityId)
    .throwOnError();

  return supabaseAdapter.toCityPreview(data);
}

export const SupabaseCityRepo: ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
};
