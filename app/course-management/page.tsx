import CourseTable from "./_components/CourseTable";

import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";

const CourseManagementPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  const currentUser = await getCurrentUserFromDb();

  const isAdmin = currentUser?.isAdmin;
  const isCoordinator = currentUser?.isCoordinator;
  const isFaculty = currentUser?.isFaculty;

  return (
    <>
      <div
        className={`pt-[85px] px-10 ${
          !isAdmin && !isCoordinator && !isFaculty && "hidden"
        }`}
      >
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <p className="text-slate-500 mt-1">
          You can add, update, and delete courses here.
        </p>
        <div className="mt-8">
          <CourseTable professors={professors} courses={courses} />
        </div>
      </div>
      <div
        className={`h-full flex items-center justify-center ${
          (isAdmin || isCoordinator || isFaculty) && "hidden"
        }`}
      >
        You cannot access this.
      </div>
    </>
  );
};

export default CourseManagementPage;
