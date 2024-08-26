"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getCurrentUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}
