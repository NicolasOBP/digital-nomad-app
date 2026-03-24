import { CityPreview } from "../types";

import { supabase } from "./supabase";

const STORAGE_URL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

async function findAll(): Promise<CityPreview[]> {
  try {
    const { data } = await supabase.from("cities").select("*");

    if (!data) {
      throw new Error("data is not available");
    }

    return data.map((row) => ({
      country: row.country,
      coverImage: `${STORAGE_URL}/${row.cover_image}`,
      id: row.id,
      name: row.name,
    }));
  } catch (error) {
    throw error;
  }
}
export const supabaseService = { findAll };
