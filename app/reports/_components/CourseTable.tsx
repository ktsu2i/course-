"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course, User } from "@prisma/client";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTable } from "./DataTable";
import { DEPARTMENTS } from "@/lib/constatns";

interface CourseTableProps {
  professors: User[];
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({
  professors,
  courses,
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
      }
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

  return <DataTable columns={columns} data={courses} courses={courses} />;
};

export default CourseTable;
