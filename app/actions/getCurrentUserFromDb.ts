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
    console.log(emailAddress);

    const uniqueUser = await db.user.findUnique({
      where: {
        tuEmail: emailAddress,
      },
    });

    return uniqueUser;

  } catch (error) {
    return null;
  }
}