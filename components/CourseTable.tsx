"use client";

import { Course, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "./ui/button";

import { DataTable } from "./DataTable";
import { DEPARTMENTS } from "@/lib/constatns";

interface CourseTableProps {
  courses: Course[];
  currentUser: User | null;
};

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  currentUser,
}) => {
  const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const departmentInShort = row.getValue("department") as string;
      const department = DEPARTMENTS.find(
        (department) => department.value === departmentInShort
      );

      return department?.label;
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course (section)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dayAndTime",
    header: "Day & Time",
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
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => {
      const semester = row.getValue("semester") as string;
      const capitalizedSemester = semester.charAt(0).toUpperCase() + semester.slice(1);

      return capitalizedSemester;
    },
  },
  {
    accessorKey: "year",
    accessorFn: (row) => row.year.toString(),
    header: "Year",
  },
  ];
  
  const myCourses = courses.filter((course) => course.userId === currentUser?.id);

  return <DataTable columns={columns} data={myCourses} />;
}
 
export default CourseTable;