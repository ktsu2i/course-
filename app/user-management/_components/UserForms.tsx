"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserForms = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <div className="text-2xl font-bold">Add a user</div>
        <p className="text-slate-600">Please be sure this does not change any user information for authentication, but this adds the user information in the database.</p>
      </TabsContent>
      <TabsContent value="update">
        <div>Update a user</div>
      </TabsContent>
      <TabsContent value="delete">
        <div>Delete a user</div>
      </TabsContent>
    </Tabs>
  );
};

export default UserForms;
