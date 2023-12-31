import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      department,
      courseNum,
      section,
      title,
      roomNum,
      hasSecuredRoom
    } = await request.json();

    const course = await db.course.create({
      data: {
        department: department,
        courseNum: courseNum,
        section: section,
        title: title,
        roomNum: roomNum,
        hasSecuredRoom: hasSecuredRoom,
      }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}