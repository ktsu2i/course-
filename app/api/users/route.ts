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
    const emailAddress = user?.emailAddresses[0].emailAddress as string;

    const newUser = await db.user.create({
      data: {
        tuid: tuid,
        firstName: firstName,
        lastName: lastName,
        fullName: firstName + " " + lastName,
        tuEmail: emailAddress,
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

export async function PATCH(
  request: Request
) {
  try {
    const user = await currentUser();
    const values = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const emailAddress = user?.emailAddresses[0].emailAddress;

    const updatedUser = await db.user.update({
      where: {
        tuEmail: emailAddress
      },
      data: {
        ...values
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.log("[USERS] - PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}