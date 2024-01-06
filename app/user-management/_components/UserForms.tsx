"use client";

import { User } from "@prisma/client";
import UpdateAndDeleteUserForm from "./UpdateAndDeleteUserForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserFormsProps {
  users: User[];
  currentUser: User | null;
};

const UserForms: React.FC<UserFormsProps> = ({
  users,
  currentUser,
}) => {
  return (
    <Tabs defaultValue="update/delete">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="add">Add</TabsTrigger>
        <TabsTrigger value="update/delete">Update/Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <div className="text-2xl font-bold mt-6">Add a user</div>
        <p className="text-slate-600 mt-3">Since users must sign up to visit the root page, you don't need to add users manually. For admin & coordinators, please add a role to new users after they signed up.</p>
      </TabsContent>
      <TabsContent value="update/delete">
        <UpdateAndDeleteUserForm users={users} currentUser={currentUser} />
      </TabsContent>
    </Tabs>
  );
};

export default UserForms;
