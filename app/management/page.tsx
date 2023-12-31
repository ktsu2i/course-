import Navbar from "@/components/Navbar";
import CourseForms from "./_components/CourseForms";
import getAllProfessors from "../actions/getAllProfessors";

const ManagementPage = async () => {
  const professors = await getAllProfessors();

  return (
    <>
      <Navbar />
      <div className="text-2xl font-bold text-center mt-5">Manage a course</div>
      <div className="mt-5 mx-48">
        <CourseForms professors={professors} />
      </div>
    </>
  );
};
 
export default ManagementPage;