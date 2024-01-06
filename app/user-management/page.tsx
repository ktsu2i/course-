import Navbar from "@/components/Navbar";
import UserForms from "./_components/UserForms";

import getAllUsers from "../actions/getAllUsers";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import UpdateAndDeleteUserForm from "./_components/UpdateAndDeleteUserForm";

const UserManagementPage = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUserFromDb();

  return (
    <>
      <Navbar />
      <div className="max-w-[900px] mx-auto mt-[85px]">
        <div className="text-2xl font-bold text-center mt-5">
          Manage a user
        </div>
        <div className="mt-5">
          {/* <UserForms users={users} currentUser={currentUser} /> */}
          <UpdateAndDeleteUserForm users={users} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;