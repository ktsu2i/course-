import getAllUsers from "../actions/getAllUsers";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import UpdateAndDeleteUserForm from "./_components/UpdateAndDeleteUserForm";

const UserManagementPage = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUserFromDb();

  return (
    <>
      <div className="max-w-[1800px] mt-[85px] px-10">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-slate-500 mt-1">
          After users sign up, they will be 'guest' users, who have no roles.
          Please add their roles to them.
        </p>
        <div className="mt-5">
          <UpdateAndDeleteUserForm users={users} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
