import { Category } from "@/src/domain/category/Category";
import { City, CityPreview } from "@/src/domain/city/City";
import {
  CitiesGroupedByCategory,
  CityToggleFavoriteParams,
  ICityRepo,
} from "@/src/domain/city/ICityRepo";

import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";
import { supabaseUtils } from "./supabaseUtils";

export type CityFilter = {
  categoryId?: Category["id"] | null;
  name?: Category["name"];
};

const CITY_PREVIEW_CITIES =
  "id,name,country,cover_image,favorite_cities!left(user_id)";

async function findAll(filters: CityFilter): Promise<CityPreview[]> {
  try {
    const user = await supabaseUtils.getUserFromSession();

    let cities = null;
    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(CITY_PREVIEW_CITIES)
        .eq("category_id", filters.categoryId)
        .ilike("name", `%${filters.name}%`)
        .eq("favorite_cities.user_id", user.id);

      cities = data;
    } else {
      const { data } = await supabase
        .from("cities")
        .select(CITY_PREVIEW_CITIES)
        .ilike("name", `%${filters.name}%`)
        .eq("favorite_cities.user_id", user.id);

      cities = data;
    }

    if (!cities) {
      throw new Error("data is not available");
    }

    return cities.map((row) => supabaseAdapter.toCityPreview(row));
  } catch (error) {
    throw error;
  }
}

async function findById(id: CityPreview["id"]): Promise<City> {
  const user = await supabaseUtils.getUserFromSession();
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*,favorite_cities(user_id)")
    .eq("id", id)
    .eq("favorite_cities.user_id", user.id)
    .single();

  if (error) {
    throw new Error("City not found");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(
  cityId: CityPreview["id"],
): Promise<CityPreview[]> {
  const user = await supabaseUtils.getUserFromSession();

  const { data } = await supabase
    .from("related_cities")
    .select(CITY_PREVIEW_CITIES)
    .eq("source_city_id", cityId)
    .eq("favorite_cities.user_id", user.id)
    .throwOnError();

  return data.map((row) => supabaseAdapter.toCityPreview(row));
}

async function toggleFavorite(params: CityToggleFavoriteParams): Promise<void> {
  const user = await supabaseUtils.getUserFromSession();

  if (params.isFavorite) {
    await supabase
      .from("favorite_cities")
      .delete()
      .eq("user_id", user.id)
      .eq("city_id", params.cityId);
  } else {
    await supabase
      .from("favorite_cities")
      .insert({ city_id: params.cityId, user_id: user.id });
  }
}

async function findAllFavorites(): Promise<CityPreview[]> {
  const user = await supabaseUtils.getUserFromSession();

  const { data } = await supabase
    .from("favorite_cities")
    .select(
      `cities (
      id,
      name,
      country,
      cover_image
      )`,
    )
    .eq("user_id", user.id)
    .throwOnError();

  return data.map((item) => supabaseAdapter.toCityPreview(item.cities, true));
}

async function findGroupedByCategory(): Promise<CitiesGroupedByCategory[]> {
  const { data } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      description,
      code,
      city_categories (
        cities(
          id,
          name,
          country,
          cover_image
        )  
      )
    `,
    )
    .throwOnError();

  return data.map((item) => ({
    category: supabaseAdapter.toCategory({
      code: item.code,
      description: item.description,
      id: item.id,
      name: item.name,
    }),
    cities: item.city_categories.map((item) =>
      supabaseAdapter.toCityPreview(item.cities),
    ),
  }));
}

export const SupabaseCityRepo: ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
  toggleFavorite,
  findAllFavorites,
  findGroupedByCategory,
};
