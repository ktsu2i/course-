"use client";

import { Course, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
// import { parseISO } from "date-fns";

import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DataTable } from "./DataTable";
import { DEPARTMENTS } from "@/lib/constants";

interface CourseTableProps {
  courses: Course[];
  currentUser: User | null;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, currentUser }) => {
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Select
            onValueChange={(value) => {
              column.setFilterValue(value);
            }}
          >
            <SelectTrigger className="border-none bg-transparent mr-1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">
                <Badge className="bg-gray-500 text-white">New</Badge>
              </SelectItem>
              <SelectItem value="approved">
                <Badge className="bg-green-600 text-white">Approved</Badge>
              </SelectItem>
              <SelectItem value="rejected">
                <Badge className="bg-destructive text-destructive-foreground">
                  Rejected
                </Badge>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status");

        if (status === "new") {
          return <Badge className="bg-gray-500 text-white">New</Badge>;
        } else if (status === "approved") {
          return <Badge className="bg-green-600 text-white">Approved</Badge>;
        } else if (status === "rejected") {
          return (
            <Badge className="bg-destructive text-destructive-foreground">
              Rejected
            </Badge>
          );
        } else {
          return <Badge className="bg-red-600/20 text-red-700">Error</Badge>;
        }
      },
    },
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

  // const myCourses = courses.filter(
  //   (course) => course.userId === currentUser?.id
  // );

  type ScheduleType = {
    monday?: {
      start: string,
      end: Date,
    }
  };

  const mondayCourses = courses.filter((course) => {
    if (!course.schedule) return false;

    const schedule = course.schedule as ScheduleType;

    const mondaySchedule = schedule?.monday;
    const start = mondaySchedule?.start;

    console.log(start);
    // if (!start) return false;

    // const utcDate = new Date(start);
    // if (utcDate.getHours() === 10) {
    //   console.log("Yes");
    // }

    return course;
  });

  // return <DataTable columns={columns} data={myCourses} />;
  return <DataTable columns={columns} data={mondayCourses} />;
};

export default CourseTable;
