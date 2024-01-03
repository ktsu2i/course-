"use client";

import { Course, User } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddCourseForm from "./AddCourseForm";
import UpdateCourseForm from "./UpdateCourseForm";
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
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddCourseForm professors={professors} />
      </TabsContent>
      <TabsContent value="update">
        <UpdateCourseForm professors={professors} />
      </TabsContent>
      <TabsContent value="delete">
        <DeleteCourseForm professors={professors} courses={courses} />
      </TabsContent>
    </Tabs>
  );
}
 
export default CourseForms;