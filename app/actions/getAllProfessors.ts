// import { db } from "@/lib/db";

import { User } from "@/lib/types";

export default async function getAllProfessors() {
  try {
    // const professors = await db.user.findMany({
    //   where: {
    //     OR: [
    //       { isCoordinator: true },
    //       { isFaculty: true },
    //     ],
    //   },
    // });

    const professors: User[] = [];

    return professors;

  } catch (error) {
    return [];
  }
}