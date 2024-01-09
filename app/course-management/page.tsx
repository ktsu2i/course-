import CourseForms from "./_components/CourseForms";

import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";

const CourseManagementPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  return (
    <>
      <div className="mt-[85px] px-10">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <p className="text-slate-500 mt-1">
          You can add, update, and delete courses here.
        </p>
        <div className="mt-8">
          <CourseForms professors={professors} courses={courses} />
        </div>
      </div>
    </>
  );
};

export default CourseManagementPage;
