import getAllProfessors from "@/app/actions/getAllProfessors";
import getCoursesByRecordKey from "@/app/actions/getCoursesByRecordKey";
import CourseRecordTable from "../_components/CourseRecordTable";

interface IParams {
  recordKey: string;
};

const RecordPage = async ({ params }: { params: IParams }) => {
  const professors = await getAllProfessors();
  const courses = await getCoursesByRecordKey(params);

  return (
    <div className="pt-[85px] px-10">
      <h1 className="text-2xl font-bold">History of Updates</h1>
      <p className="text-slate-500 mt-1">
        You can check the history of updates for the course.
      </p>
      <div className="mt-8">
        <CourseRecordTable professors={professors} courses={courses} />
      </div>
    </div>
  );
};

export default RecordPage;