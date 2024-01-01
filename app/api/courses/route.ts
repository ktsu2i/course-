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
      crn,
      instructorId,
      isNewInstructor,
      dayAndTime,
      semester,
      year,
      classType,
      roomNum,
      hasSecuredRoom,
      specialInfo,
      notes,
    } = await request.json();

    let course;

    if (classType === "online") {
      course = await db.course.create({
        data: {
          department: department,
          courseNum: courseNum,
          section: section,
          title: title,
          crn: crn,
          userId: instructorId,
          isNewInstructor: isNewInstructor,
          dayAndTime: dayAndTime,
          semester: semester,
          year: year,
          classType: classType,
          specialInfo: specialInfo,
          notes: notes,
        },
      });
    } else {
      course = await db.course.create({
        data: {
          department: department,
          courseNum: courseNum,
          section: section,
          title: title,
          crn: crn,
          userId: instructorId,
          isNewInstructor: isNewInstructor,
          dayAndTime: dayAndTime,
          semester: semester,
          year: year,
          classType: classType,
          roomNum: roomNum,
          hasSecuredRoom: hasSecuredRoom,
          specialInfo: specialInfo,
          notes: notes,
        },
      });
    }

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}