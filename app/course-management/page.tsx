import CourseForms from "./_components/CourseForms";

import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";

const ManagementPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  return (
    <>
      {/* <div className="max-w-[420px] mx-auto mt-[85px]"> */}
      <div className="mx-auto mt-[65px]">
        <div className="text-2xl font-bold text-center mt-5">
          Manage a course
        </div>
        <div className="mt-5 px-10">
          <CourseForms professors={professors} courses={courses} />
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
