import { db } from "@/lib/db"

export default async function getAllProfessors() {
  try {
    const professors = await db.user.findMany({
      where: {
        OR: [
          { isCoordinator: true },
          { isFaculty: true },
        ],
      },
    });

    return professors;
    
  } catch (error) {
    return null;
  }
}