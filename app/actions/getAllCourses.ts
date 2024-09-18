// import { db } from "@/lib/db";

import { Course } from "@/lib/types";

export default async function getAllCourses() {
  try {
    // const courses = await db.course.findMany();
    const courses: Course[] = [];

    if (!courses) {
      return [];
    }

    return courses;
  } catch (error) {
    return [];
  }
}
