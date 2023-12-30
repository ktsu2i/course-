import Navbar from "@/components/Navbar";
import RegisterUserForm from "../_components/RegisterUserForm";

const RegisterProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="m-10 flex-col justify-center">
        <div className="text-2xl mb-5">
          Register Your TUID
        </div>
        <RegisterUserForm />
      </div>
    </>
  );
};

export default RegisterProfilePage;
