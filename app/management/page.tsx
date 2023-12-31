import Navbar from "@/components/Navbar";
import CourseForm from "./_components/CourseForm";

import getAllProfessors from "../actions/getAllProfessors";

const ManagementPage = async () => {
  const professors = await getAllProfessors();

  return (
    <>
      <Navbar />
      <div className="text-2xl font-bold text-center mt-5">Manage a course</div>
      <div className="mt-5 mx-48">
        <CourseForm professors={professors} />
      </div>
    </>
  );
};
 
export default ManagementPage;