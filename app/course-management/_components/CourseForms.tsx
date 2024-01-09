"use client";

import { Course, User } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddCourseForm from "./AddCourseForm";
import UpdateAndDeleteCourseForm from "./UpdateAndDeleteCourseForm";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface CourseFormsProps {
  professors: User[],
  courses: Course[],
};

const CourseForms: React.FC<CourseFormsProps> = ({
  professors,
  courses,
}) => {
  return (
    <>
      <Tabs defaultValue="add" className="2xl:hidden">
        <TabsList className="grid grid-cols-2 max-w-[300px]">
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="update/delete">Update/Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className="max-w-[600px] mt-6">
            <AddCourseForm professors={professors} />
          </div>
        </TabsContent>
        <TabsContent value="update/delete">
          <UpdateAndDeleteCourseForm
            professors={professors}
            courses={courses}
          />
        </TabsContent>
      </Tabs>

      {/* For wide display */}
      <div className="hidden 2xl:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="mr-10 max-w-[600px]">
              <AddCourseForm professors={professors} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={40}>
            <div className="mx-10">
              <UpdateAndDeleteCourseForm
                professors={professors}
                courses={courses}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
 
export default CourseForms;