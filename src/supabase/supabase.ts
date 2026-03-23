import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";

function getSupabaseEnvs(): { url: string; anonKey: string } {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("supabase env was not defined");
  }

  return {
    url,
    anonKey,
  };
}
const envs = getSupabaseEnvs();

export const supabase = createClient(envs.url, envs.anonKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
