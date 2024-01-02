import Navbar from "@/components/Navbar";
import CourseForms from "./_components/CourseForms";
import getAllProfessors from "../actions/getAllProfessors";

const ManagementPage = async () => {
  const professors = await getAllProfessors();

  return (
    <>
      <Navbar />
      <div className="max-w-max mx-auto mt-[85px]">
        <div className="text-2xl font-bold text-center mt-5">
          Manage a course
        </div>
        <div className="mt-5">
          <CourseForms professors={professors} />
        </div>
      </div>
    </>
  );
};
 
export default ManagementPage;