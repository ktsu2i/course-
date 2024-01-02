import getUserById from "@/app/actions/getUserById";
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

    const instructor = await getUserById(instructorId);

    const label = `${department.toUpperCase()} ${courseNum} (${section}): ${title} - ${instructor?.fullName}`;

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
          label: label,
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
          label: label,
        },
      });
    }

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
) {
  try {
    const user = await currentUser();
    const { courseId } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}