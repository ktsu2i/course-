import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";
import CourseTable from "./_components/CourseTable";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";
import getAllUniqueRecordKeys from "../actions/getAllUniqueRecordKeys";
import { auth } from "@/auth";

const ReportPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();
  const recordKeys = await getAllUniqueRecordKeys();

  const currentUser = await getCurrentUserFromDb();

  const session = await auth();

  const isAdmin = session?.user.roles.includes("admin");
  const isStaff = session?.user.roles.includes("staff");

  return (
    <>
      <div className={`pt-[85px] px-10 ${!isAdmin && !isStaff && "hidden"}`}>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-slate-500 mt-1">
          You can see a list of all the registered courses and export the data
          as an Excel file.
        </p>
        <div className="mt-8">
          <CourseTable
            professors={professors}
            courses={courses}
            recordKeys={recordKeys}
          />
        </div>
      </div>
      <div
        className={`h-full flex items-center justify-center ${
          (isAdmin || isStaff) && "hidden"
        }`}
      >
        You cannot access this.
      </div>
    </>
  );
};

export default ReportPage;
