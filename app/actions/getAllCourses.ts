import { db } from "@/lib/db";

export default async function getAllCourses() {
  try {
    const courses = await db.course.findMany();

    if (!courses) {
      return [];
    }

    return courses;
    
  } catch (error) {
    return [];
  }
}