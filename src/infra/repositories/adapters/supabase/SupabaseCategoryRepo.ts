import { Category } from "@/src/domain/category/Category";
import { ICategoryRepo } from "@/src/domain/category/ICategoryRepo";

import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

async function findAll(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    throw new Error("Failed to fetch categories");
  }

  return supabaseAdapter.toCategory(data);
}

export const SupabaseCategoryRepo: ICategoryRepo = {
  findAll,
};
