import { db } from "@/lib/db";
import { Course } from "@/lib/types";
import axios from "axios";

export default async function getAllCourses() {
  try {
    // const courses = await db.course.findMany();
    const res = await axios.get<Course[]>("/api/courses");
    const courses = res.data;

    if (!courses) {
      return [];
    }

    return courses;
  } catch (error) {
    return [];
  }
}
