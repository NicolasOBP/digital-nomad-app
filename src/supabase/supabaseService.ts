import { Category, CityPreview } from "../types";

import { supabase } from "./supabase";

const STORAGE_URL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

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

  return data.map((row) => ({
    code: row.code as Category["code"],
    id: row.id,
    name: row.name,
    description: row.description,
  }));
}

export const supabaseService = { findAll, listCategories };
