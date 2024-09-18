"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { parseISO, format, formatDistanceToNowStrict } from "date-fns";

import { DataTable } from "@/app/(authenticated)/course-management/_components/DataTable";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Course, ScheduleType, User } from "@/lib/types";

interface CourseRecordTableProps {
  professors: User[];
  courses: Course[];
}

const CourseRecordTable: React.FC<CourseRecordTableProps> = ({
  professors,
  courses
}) => {
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
                <Badge className="bg-gray-500 text-white">Pending</Badge>
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
      accessorKey: "credits",
      header: "Credits",
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
      },
    },
    {
      accessorKey: "crn",
      header: "CRN",
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
    {
      accessorKey: "createdAt",
      header: "",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date;
        const time = formatDistanceToNowStrict(createdAt);

        return <div className="text-slate-600">{time} ago</div>;
      }
    }
  ];

  return (
    <DataTable columns={columns} data={courses} professors={professors} hidden />
  );
};

export default CourseRecordTable;
