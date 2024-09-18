// import { db } from "@/lib/db";

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