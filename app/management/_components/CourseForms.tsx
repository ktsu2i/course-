"use client";

import { Course, User } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddCourseForm from "./AddCourseForm";
import DeleteCourseForm from "./DeleteCourseForm";

interface CourseFormsProps {
  professors: User[],
  courses: Course[],
};

const CourseForms: React.FC<CourseFormsProps> = ({
  professors,
  courses,
}) => {
  return (
    <Tabs defaultValue="add">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update/delete">Update/Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddCourseForm professors={professors} />
      </TabsContent>
      <TabsContent value="update/delete">
        <DeleteCourseForm professors={professors} courses={courses} />
      </TabsContent>
    </Tabs>
  );
}
 
export default CourseForms;