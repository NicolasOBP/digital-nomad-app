import { Category, City, TouristAttraction } from "../types";

import { Database } from "./types";

export const STORAGE_URL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

type CityWithFullInfo =
  Database["public"]["Views"]["cities_with_full_info"]["Row"];

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

type TouristAttractionsRow =
  Database["public"]["Tables"]["tourist_attractions"]["Row"];

function toCity(data: CityWithFullInfo): City {
  const categories = data.categories as CategoryRow[];
  const tourist_attractions =
    data.tourist_attractions as TouristAttractionsRow[];

  return {
    id: data.id as string,
    country: data.country as string,
    description: data.description as string,
    coverImage: `${STORAGE_URL}/${data.cover_image}`,
    location: {
      latitude: data.latitude as number,
      longitude: data.longitude as number,
    },
    categories: toCategory(categories),
    name: data.name as string,
    touristAttractions: toTouristAttractions(tourist_attractions),
  };
}

function toTouristAttractions(
  data: TouristAttractionsRow[],
): TouristAttraction[] {
  return data.map((row) => ({
    id: row.id,
    cityId: row.city_id as string,
    description: row.description,
    name: row.name,
  }));
}

function toCategory(data: CategoryRow[]): Category[] {
  return data.map((row) => ({
    code: row.code as Category["code"],
    id: row.id,
    name: row.name,
    description: row.description,
  }));
}

export const supabaseAdapter = { toCity, toCategory };
