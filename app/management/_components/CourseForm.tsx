"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddCourseForm from "./AddCourseForm";

const CourseForm = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddCourseForm />
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