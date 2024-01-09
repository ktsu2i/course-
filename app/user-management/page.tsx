import getAllUsers from "../actions/getAllUsers";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import UpdateAndDeleteUserForm from "./_components/UpdateAndDeleteUserForm";

const UserManagementPage = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUserFromDb();

  return (
    <>
      <div className="max-w-[1800px] mx-auto mt-[65px] px-10">
        <div className="text-2xl font-bold text-center mt-5">Manage a user</div>
        <div className="mt-5">
          {/* We may not even need <UserForms> */}
          {/* <UserForms users={users} currentUser={currentUser} /> */}
          <UpdateAndDeleteUserForm users={users} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
