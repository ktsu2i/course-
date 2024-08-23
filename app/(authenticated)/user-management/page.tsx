import UserTable from "./_components/UserTable";

import getAllUsers from "../../actions/getAllUsers";
import getCurrentUserFromDb from "../../actions/getCurrentUserFromDb";

const UserManagementPage = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUserFromDb();

  // const isAdmin = session?.user.roles.includes("admin");
  // const isCoordinator = session?.user.roles.includes("coordinator");
  const isAdmin = true;
  const isCoordinator = false;

  return (
    <>
      <div
        className={`max-w-[1800px] pt-[85px] px-10 ${
          !isAdmin && !isCoordinator && "hidden"
        }`}
      >
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-slate-500 mt-1">
          After users sign up, they will be &apos;guest&apos; users, who have no
          roles. Please add roles to them.
        </p>
        <div className="mt-5">
          <UserTable users={users} currentUser={currentUser} />
        </div>
      </div>
      <div
        className={`h-full flex items-center justify-center ${
          (isAdmin || isCoordinator) && "hidden"
        }`}
      >
        You cannot access this.
      </div>
    </>
  );
};

export default UserManagementPage;
