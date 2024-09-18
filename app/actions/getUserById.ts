// import { db } from "@/lib/db";

import { User } from "@/lib/types";

export default async function getUserById(
  id: string,
) {
  try {
    // const user = await db.user.findUnique({
    //   where: {
    //     id: id,
    //   },
    // });

    const user: User | null = null;

    return user;
    
  } catch (error) {
    console.log("getUserById - Error:", error);
    return null;
  }
}