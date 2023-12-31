"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddCourseForm from "./AddCourseForm";
import { User } from "@prisma/client";

interface CourseFormProps {
  professors: User[] | null,
};

const CourseForm: React.FC<CourseFormProps> = ({
  professors,
}) => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddCourseForm professors={professors} />
      </TabsContent>
      <TabsContent value="update">
        <div>Update a course</div>
      </TabsContent>
      <TabsContent value="delete">
        <div>Delete a course</div>
      </TabsContent>
    </Tabs>
  );
}
 
export default CourseForm;