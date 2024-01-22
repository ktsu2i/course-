import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";
import Data from "./_components/CourseTable";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";

const ReportPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  const currentUser = await getCurrentUserFromDb();

  const isAdmin = currentUser?.isAdmin;
  const isStaff = currentUser?.isStaff;

  return (
    <>
      <div
        className={`pt-[85px] px-10 ${
          (!isAdmin && !isStaff) && "hidden"
        }`}
      >
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-slate-500 mt-1">
          You can see a list of all the registered courses and export the data
          as an Excel file.
        </p>
        <div className="mt-8">
          <Data professors={professors} courses={courses} />
        </div>
      </div>
      <div className={`h-full flex items-center justify-center ${(isAdmin || isStaff) && "hidden"}`}>
        You cannot access this.
      </div>
    </>
  );
};

export default ReportPage;
