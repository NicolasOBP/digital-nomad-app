import { Category, City, CityPreview } from "../types";

import { supabase } from "./supabase";
import { STORAGE_URL, supabaseAdapter } from "./supabaseAdapter";

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

    return cities.map(
      (row) =>
        ({
          country: row.country,
          coverImage: `${STORAGE_URL}/${row.cover_image}`,
          id: row.id,
          name: row.name,
        }) as CityPreview,
    );
  } catch (error) {
    throw error;
  }
}

async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return supabaseAdapter.toCategory(data);
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

export const supabaseService = { findAll, listCategories, findById };
