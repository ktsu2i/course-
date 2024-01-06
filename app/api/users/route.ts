import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  request: Request
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tuid } = await request.json();
    const firstName = user?.firstName as string;
    const lastName = user?.lastName as string;
    const fullName = firstName + " " + lastName;
    const emailAddress = user?.emailAddresses[0].emailAddress;

    const newUser = await db.user.create({
      data: {
        tuid: tuid,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        tuMail: emailAddress,
      }
    });

    await clerkClient.users.updateUserMetadata(user?.id, {
      publicMetadata: {
        "hasRegistered": true
      }
    });

    return NextResponse.json(newUser);

  } catch (error) {
    console.log("[USERS] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function PATCH(
//   request: Request
// ) {
//   try {
//     const user = await currentUser();
//     const values = await request.json();

//     if (!user) {
//       return new NextResponse("Unauthorized", { status: 400 });
//     }

//     const emailAddress = user?.emailAddresses[0].emailAddress;

//     const updatedUser = await db.user.update({
//       where: {
//         tuMail: emailAddress
//       },
//       data: {
//         ...values
//       }
//     });

//     return NextResponse.json(updatedUser);

//   } catch (error) {
//     console.log("[USERS] - PATCH", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function PATCH(
  request: Request,
) {
  try {
    const user = await currentUser();
    const {
      id,
      tuid,
      firstName,
      lastName,
      isAdmin,
      isCoordinator,
      isFaculty,
      isStaff,
    } = await request.json();

    const fullName = firstName + " " + lastName;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    // Update a user from db
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        tuid: tuid,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        isAdmin: isAdmin,
        isCoordinator: isCoordinator,
        isFaculty: isFaculty,
        isStaff: isStaff,
      }
    });

    // Update a user from Clerk
    const params = {
      firstName: firstName,
      lastName: lastName,
    };

    await clerkClient.users.updateUser(user.id, params);

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.log("[USER] - PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
) {
  try {
    const user = await currentUser();
    const { userId } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete a user from db
    await db.user.delete({
      where: {
        id: userId,
      },
    });

    // Delete a user from Clerk
    await clerkClient.users.deleteUser(user.id);

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.log("[USERS] - DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}