import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";
import Data from "./_components/Data";

const ReportPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  return (
    <div className="mt-[85px] px-10">
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="text-slate-500 mt-1">
        You can see a list of all the registered courses and export the data as
        an Excel file.
      </p>
      <div className="mt-8">
        <Data professors={professors} courses={courses} />
      </div>
    </div>
  );
};

export default ReportPage;
