"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2, ArrowUpDown } from "lucide-react";
import { parseISO, format } from "date-fns";
import { Course, User } from "@prisma/client";

import UpdateCourseAlert from "./UpdateCourseAlert";
import { DataTable } from "@/app/course-management/_components/DataTable";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { ScheduleType } from "@/lib/types";

interface CourseTableProps {
  professors: User[];
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({
  professors,
  courses,
}) => {
  const router = useRouter();

  const handleDelete = async (courseId: string) => {
    try {
      await axios.delete("/api/courses", { data: { courseId } });
      toast.success("Course deleted!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

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
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        const isNewCourse = row.getValue("status") === "new";
        const isRejectedCourse = row.getValue("status") === "rejected";

        return (
          <div className={`flex gap-x-2 ${isNewCourse && "hidden"}`}>
            <UpdateCourseAlert
              disabled={isRejectedCourse}
              professors={professors}
              courses={courses}
              courseId={row.getValue("id")}
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &apos;
                    {row.getValue("label")}&apos;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => handleDelete(row.getValue("id"))}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const latestCourseObjects = courses.reduce<{ [key: string]: Course }>(
    (acc, course) => {
      const existingCourse = acc[course.recordKey];

      if (!existingCourse || existingCourse.updatedAt < course.updatedAt) {
        acc[course.recordKey] = course;
      }

      return acc;
    }, {}
  );

  const latestCourses = Object.values(latestCourseObjects);

  return <DataTable columns={columns} data={latestCourses} professors={professors} />;
};

export default CourseTable;
