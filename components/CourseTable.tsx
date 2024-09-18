"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { parseISO, format } from "date-fns";

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
import { ScheduleType } from "@/lib/types";

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
              <SelectItem value="updated">
                <Badge className="bg-blue-500 text-white">Updated</Badge>
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
          return <Badge className="bg-gray-500 text-white">Pending</Badge>;
        } else if (status === "updated") {
          return <Badge className="bg-blue-500 text-white">Updated</Badge>;
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
    // {
    //   accessorKey: "department",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         className="pl-0"
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Department
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const departmentInShort = row.getValue("department") as string;
    //     const department = DEPARTMENTS.find(
    //       (department) => department.value === departmentInShort
    //     );

    //     return department?.label;
    //   },
    // },
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
      accessorKey: "schedule",
      header: "Schedule",
      cell: ({ row }) => {
        const schedule = row.getValue("schedule") as ScheduleType;
        let start: string | undefined = undefined;
        let end: string | undefined = undefined;
        let days: string = "";

        if (schedule?.monday) {
          start = schedule?.monday?.start;
          end = schedule?.monday?.end;
          days += "M";
        }
        
        if (schedule?.tuesday) {
          start = schedule?.tuesday?.start;
          end = schedule?.tuesday?.end;
          days += "T";
        }
        
        if (schedule?.wednesday) {
          start = schedule?.wednesday?.start;
          end = schedule?.wednesday?.end;
          days += "W";
        }
        
        if (schedule?.thursday) {
          start = schedule?.thursday?.start;
          end = schedule?.thursday?.end;
          days += "Th";
        }
        
        if (schedule?.friday) {
          start = schedule?.friday?.start;
          end = schedule?.friday?.end;
          days += "F";
        }

        let startTime = "n/a";
        let endTime = "n/a";
        if (start !== undefined) {
          startTime = format(parseISO(start), "h:mm a");
        }
        if (end !== undefined) {
          endTime = format(parseISO(end), "h:mm a");
        }

        return `${days} ${startTime} - ${endTime}`;
      }
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

  const latestCourseObject = courses.reduce<{ [key: string]: Course }>((acc, course) => {
    const existingCourse = acc[course.recordKey];

    if (!existingCourse || existingCourse.updatedAt < course.updatedAt) {
      acc[course.recordKey] = course;
    }

    return acc;
  },{});

  const latestCourses = Object.values(latestCourseObject);

  const myCourses = latestCourses.filter(
    (course) => course.userId === currentUser?.id
  );

  // const mondayCourses = courses.filter((course) => {
  //   if (!course.schedule) return false;

  //   const schedule = course.schedule as ScheduleType;

  //   for (const day in schedule) {
  //     if (day === "monday") {
  //       console.log(schedule.monday?.start);
  //       return course;
  //     }
  //   }
  // });

  return <DataTable columns={columns} data={myCourses} />;
  // return <DataTable columns={columns} data={mondayCourses} />;
};

export default CourseTable;
