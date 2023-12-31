import Navbar from "@/components/Navbar";
import CourseForm from "./_components/CourseForm";

const ManagementPage = () => {
  return (
    <>
      <Navbar />
      <div className="text-2xl font-bold text-center mt-5">Manage a course</div>
      <div className="mt-5 mx-48">
        <CourseForm />
      </div>
    </>
  );
};
 
export default ManagementPage;