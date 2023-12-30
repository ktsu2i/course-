import Navbar from "@/components/Navbar";
import UpdateUserForm from "../_components/UpdateUserForm";

const UpdateProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="m-10 flex-col justify-center">
        <div className="text-2xl mb-5">Need to update your TUID?</div>
        <UpdateUserForm />
      </div>
    </>
  );
};

export default UpdateProfilePage;
