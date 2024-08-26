// This is not working (invalid JWT error)

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AuthAdminApi } from "@supabase/auth-js";

export async function createUser(email: string, password: string) {
  const auth = new AuthAdminApi({
    url: "http://auth:9999",
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  const { data, error } = await auth.createUser({
    email,
    password,
  });

  console.log(data.user);

  if (error) {
    console.log(error);
    redirect("/error");
  }
}
