// import { db } from "@/lib/db";

import { User } from "@/lib/types";

export default async function getAllUsers() {
  try {
    // const users = await db.user.findMany();
    const users: User[] = [];

    if (!users) {
      return [];
    }

    return users;
  
  } catch (error) {
    return [];
  }
}