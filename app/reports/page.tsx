import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@prisma/client";

import getAllProfessors from "../actions/getAllProfessors";
import getAllCourses from "../actions/getAllCourses";
import Data from "./_components/Data";

const ReportPage = async () => {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "label",
      header: "Course (section)",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "dayAndTime",
      header: "Day & Time",
    },
    {
      accessorKey: "userId",
      header: "Instructor",
      cell: ({ row }) => {
        const instructor = professors.find((professor) => {
          return professor.id === row.getValue("userId");
        });

        const firstName = instructor?.firstName;
        const lastName = instructor?.lastName;

        return `${lastName}, ${firstName?.charAt(0).toUpperCase()}.`;
      },
    },
    {
      accessorKey: "crn",
      header: "CRN",
    },
    {
      accessorKey: "specialInfo",
      header: "Special Info",
    },
    {
      accessorKey: "semester",
      header: "Semester",
      cell: ({ row }) => {
        const semester = row.getValue("semester") as string;
        const capitalizedSemester =
          semester.charAt(0).toUpperCase() + semester.slice(1);

        return capitalizedSemester;
      },
    },
    {
      accessorKey: "year",
      accessorFn: (row) => row.year.toString(),
      header: "Year",
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto mt-[65px] px-10">
      <Data professors={professors} courses={courses} />
    </div>
  );
};

export default ReportPage;
