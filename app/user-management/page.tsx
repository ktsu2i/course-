import Navbar from "@/components/Navbar";
import UserForms from "./_components/UserForms";

const UserManagementPage = () => {
  return (
    <>
      <Navbar />
      <div className="text-2xl font-bold text-center mt-5">Manage users</div>
      <div className="mt-5 mx-48">
        <UserForms />
      </div>
    </>
  );
};

export default UserManagementPage;