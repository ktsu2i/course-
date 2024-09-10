// This is not working due to invalid JWT

"use server";

import { redirect } from "next/navigation";

import { createClient } from "@supabase/supabase-js";
// import { createAdminClient } from "@/utils/supabase/admin";

export async function createUser(email: string, password: string) {
  // const supabase = createAdminClient();

  console.log("SERVICE ROLE KEY: ", process.env.SUPABASE_SERVICE_ROLE_KEY);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
  });

  console.log("data.user in /createUser.ts");
  console.log(data.user);

  if (error) {
    console.log(error);
    redirect("/error");
  }
}
