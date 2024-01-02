import { db } from "@/lib/db";

export default async function getUserById(
  id: string,
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
    
  } catch (error) {
    return null;
  }
}