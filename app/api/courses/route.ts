import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface ISchedule {
  [day: string]: {
    start: string;
    end: string;
  }
};

export async function POST(
  request: Request
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      id,
      recordKey,
      department,
      courseNum,
      section,
      title,
      crn,
      credits,
      instructorId,
      isNewInstructor,
      days,
      startHour,
      startMin,
      startAmOrPm,
      endHour,
      endMin,
      endAmOrPm,
      semester,
      year,
      customYear,
      classType,
      roomNum,
      hasSecuredRoom,
      specialInfo,
      notes,
    } = await request.json();

    const startDate = new Date(2000, 0, 1, Number(startHour), Number(startMin));
    if (startAmOrPm === "am" && startHour === "12") {
      startDate.setHours(0);
    }
    if (startAmOrPm === "pm") {
      startDate.setHours(startDate.getHours() + 12);
    }

    const endDate = new Date(2000, 0, 1, Number(endHour), Number(endMin));
    if (endAmOrPm === "am" && endHour === "12") {
      endDate.setHours(0);
    }
    if (endAmOrPm === "pm") {
      endDate.setHours(endDate.getHours() + 12);
    }

    const startUTC = startDate.toISOString();
    const endUTC = endDate.toISOString();

    const schedule: ISchedule = {};
    days.forEach((day: string) => {
      schedule[day] = { start: startUTC, end: endUTC };
    });

    const padCourseNum = String(courseNum).padStart(4, "0");
    const label = `${department.toUpperCase()} ${padCourseNum} (${section})`;

    let yearValue: number;
    if (year === "other") {
      yearValue = customYear;
    } else {
      yearValue = Number(year);
    }

    let course;

    if (id) {
      // add an updated course
      if (classType === "online") {
        course = await db.course.create({
          data: {
            recordKey: recordKey,
            department: department,
            courseNum: courseNum,
            section: section,
            title: title,
            crn: crn,
            credits: Number(credits),
            userId: instructorId,
            isNewInstructor: isNewInstructor,
            schedule: schedule,
            semester: semester,
            year: yearValue,
            classType: classType,
            specialInfo: specialInfo,
            notes: notes,
            label: label,
            status: "updated"
          },
        });
      } else {
        course = await db.course.create({
          data: {
            recordKey: recordKey,
            department: department,
            courseNum: courseNum,
            section: section,
            title: title,
            crn: crn,
            credits: Number(credits),
            userId: instructorId,
            isNewInstructor: isNewInstructor,
            schedule: schedule,
            semester: semester,
            year: yearValue,
            classType: classType,
            roomNum: roomNum,
            hasSecuredRoom: hasSecuredRoom,
            specialInfo: specialInfo,
            notes: notes,
            label: label,
            status: "updated"
          },
        });
      }
    } else {
      // add a new course
      if (classType === "online") {
        course = await db.course.create({
          data: {
            department: department,
            courseNum: courseNum,
            section: section,
            title: title,
            crn: crn,
            credits: Number(credits),
            userId: instructorId,
            isNewInstructor: isNewInstructor,
            schedule: schedule,
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
            credits: Number(credits),
            userId: instructorId,
            isNewInstructor: isNewInstructor,
            schedule: schedule,
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
    }

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
) {
  try {
    const user = await currentUser();
    const {
      id,
      department,
      courseNum,
      section,
      title,
      crn,
      credits,
      instructorId,
      isNewInstructor,
      schedule,
      semester,
      year,
      customYear,
      classType,
      roomNum,
      hasSecuredRoom,
      specialInfo,
      notes,
      status,
    } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const padCourseNum = String(courseNum).padStart(4, '0');
    const updatedLabel = `${department.toUpperCase()} ${padCourseNum} (${section})`;

    let yearValue: number;
    if (year === "other") {
      yearValue = customYear;
    } else {
      yearValue = Number(year);
    }

    let course;

    if (classType === "online") {
      course = await db.course.update({
        where: {
          id: id,
        },
        data: {
          department: department,
          courseNum: courseNum,
          section: section,
          title: title,
          crn: crn,
          credits: Number(credits),
          userId: instructorId,
          isNewInstructor: isNewInstructor,
          semester: semester,
          year: yearValue,
          classType: classType,
          roomNum: undefined,
          hasSecuredRoom: undefined,
          specialInfo: specialInfo,
          notes: notes,
          label: updatedLabel,
          status: status,
        },
      });
    } else {
      course = await db.course.update({
        where: {
          id: id,
        },
        data: {
          department: department,
          courseNum: courseNum,
          section: section,
          title: title,
          crn: crn,
          credits: Number(credits),
          userId: instructorId,
          isNewInstructor: isNewInstructor,
          semester: semester,
          year: yearValue,
          classType: classType,
          roomNum: roomNum,
          hasSecuredRoom: hasSecuredRoom,
          specialInfo: specialInfo,
          notes: notes,
          label: updatedLabel,
          status: status,
        },
      });
    }

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES] - PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
) {
  try {
    const user = await currentUser();
    const { recordKey } = await request.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.course.deleteMany({
      where: {
        recordKey: recordKey,
      },
    });

    return NextResponse.json({ message: "Success" });

  } catch (error) {
    console.log("[COURSES] - DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}