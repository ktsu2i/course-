import getAllUsers from "../actions/getAllUsers";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import UpdateAndDeleteUserForm from "./_components/UpdateAndDeleteUserForm";

const UserManagementPage = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUserFromDb();

  const isAdmin = currentUser?.isAdmin;
  const isCoordinator = currentUser?.isCoordinator;
  const isFaculty = currentUser?.isFaculty;
  const isStaff = currentUser?.isStaff;
  const isGuest = !isAdmin && !isCoordinator && !isFaculty && !isStaff;

  return (
    <>
      <div className={`max-w-[1800px] mt-[85px] px-10 ${(isCoordinator || isFaculty || isStaff || isGuest) && "hidden"}`}>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-slate-500 mt-1">
          After users sign up, they will be 'guest' users, who have no roles.
          Please add roles to them.
        </p>
        <div className="mt-5">
          <UpdateAndDeleteUserForm users={users} currentUser={currentUser} />
        </div>
      </div>
      <div className={`h-full flex items-center justify-center ${(isAdmin) && "hidden"}`}>
        You cannot access this.
      </div>
    </>
  );
};

export default UserManagementPage;
