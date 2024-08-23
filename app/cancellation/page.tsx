import CourseTable from "./_components/CourseTable";

import getAllCourses from "../actions/getAllCourses";
import getCurrentUserFromDb from "../actions/getCurrentUserFromDb";

const CancellationPage = async () => {
  const courses = await getAllCourses();
  const currentUser = await getCurrentUserFromDb();

  return (
    <div className="max-w-[1800px] mt-[85px] px-10">
      <h1 className="text-2xl font-bold">Cancel Classes</h1>
      <p className="text-slate-600 mt-1">
        You can cancel classes due to sickness and so on.
      </p>
      <CourseTable courses={courses} currentUser={currentUser} />
    </div>
  );
};

export default CancellationPage;
