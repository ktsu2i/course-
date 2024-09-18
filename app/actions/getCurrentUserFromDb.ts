// import { db } from "@/lib/db";

import { User } from "@/lib/types";
import { currentUser } from "@clerk/nextjs";

export default async function getCurrentUserFromDb() {
  try {
    const user = await currentUser();
    // const hasRegistered = user?.publicMetadata?.hasRegistered;

    if (!user) {
      return null;
    }

    const emailAddress = user?.emailAddresses[0].emailAddress;

    // const uniqueUser = await db.user.findUnique({
    //   where: {
    //     tuMail: emailAddress,
    //   },
    // });

    const uniqueUser: User = {
      id: "test-user-id",
      tuid: 1234567890,
      firstName: "test",
      lastName: "test",
      fullName: "test test",
      tuMail: "test@test.com",
      department: "test",
      isAdmin: false,
      isCoordinator: false,
      isFaculty: false,
      isStaff: false,
    };

    return uniqueUser;
  } catch (error) {
    return null;
  }
}
