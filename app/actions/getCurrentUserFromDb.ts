import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs";

export default async function getCurrentUserFromDb() {
  try {
    const user = await currentUser();
    const hasRegistered = user?.publicMetadata?.hasRegistered;

    if (!user || !hasRegistered) {
      return null;
    }

    const emailAddress = user?.emailAddresses[0].emailAddress;

    const uniqueUser = await db.user.findUnique({
      where: {
        tuMail: emailAddress,
      },
    });

    return uniqueUser;

  } catch (error) {
    return null;
  }
}