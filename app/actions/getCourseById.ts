import { db } from "@/lib/db";

export default async function getCourseById(
  courseId: string,
) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    return course;
    
  } catch (error) {
    return null;
  }
}