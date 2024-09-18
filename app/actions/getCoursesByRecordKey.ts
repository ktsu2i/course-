// import { db } from "@/lib/db";

import { Course } from "@/lib/types";

interface IParams {
  recordKey: string;
}

export default async function getCoursesByRecordKey(
  params: IParams,
) {
  try {
    const { recordKey } = params;

    // const courses = await db.course.findMany({
    //   where: {
    //     recordKey: recordKey,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    const courses: Course[] = [];

    return courses;

  } catch (error) {
    console.log("getCoursesByRecordKey - Error:", error);
    return [];
  }
}