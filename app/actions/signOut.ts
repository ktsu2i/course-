"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import toast from "react-hot-toast";

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Something went wrong");
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}
