"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2, ArrowUpDown, History, AlertTriangle } from "lucide-react";
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
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { ScheduleType } from "@/lib/types";
import { DEPARTMENTS } from "@/lib/constants";

interface CourseTableProps {
  professors: User[];
  courses: Course[];
  recordKeys: string[];
}

const CourseTable: React.FC<CourseTableProps> = ({ professors, courses, recordKeys }) => {
  const router = useRouter();

  const handleDelete = async (recordKey: string) => {
    try {
      await axios.delete("/api/courses", { data: { recordKey } });
      toast.success("Course deleted!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getSecondLatestCourses = (courses: Course[], recordKeys: string[]) => {
    let secondLatestCourses: Course[] = [];

    for (const recordKey of recordKeys) {
      const groupedCourses = courses
        .filter((course) => course?.recordKey === recordKey)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      secondLatestCourses.push(groupedCourses[1]);
    }

    return secondLatestCourses;
  }

  const secondLatestCourses = getSecondLatestCourses(courses, recordKeys);

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
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const label = row.getValue("label") as string;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = label !== prevCourse?.label;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {label}
          </div>
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
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const title = row.getValue("title") as string;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = title !== prevCourse?.title;
        }

        return (
          <div
            className={`${
              hasChanged && status === "updated" ? "font-bold" : ""
            }`}
          >
            {title}
          </div>
        );
      },
    },
    {
      accessorKey: "credits",
      header: "Credits",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const credits = row.getValue("credits") as number;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = credits !== prevCourse?.credits;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {credits}
          </div>
        );
      },
    },
    {
      accessorKey: "userId",
      header: "Instructor",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const userId = row.getValue("userId") as string;
        const recordKey = row.getValue("recordKey") as string;
        const instructor = professors.find((professor) => {
          return professor.id === userId;
        });

        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = userId !== prevCourse?.userId;
        }

        const firstName = instructor?.firstName;
        const lastName = instructor?.lastName;

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {lastName}, {firstName?.charAt(0).toUpperCase()}.
          </div>
        );
      },
    },
    {
      accessorKey: "schedule",
      header: "Schedule",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;
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

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged =
            JSON.stringify(schedule) !== JSON.stringify(prevCourse?.schedule);
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {days} {startTime} - {endTime}
          </div>
        );
      },
    },
    {
      accessorKey: "classType",
      header: "Class Type",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const classType = row.getValue("classType") as string;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = classType !== prevCourse?.classType;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {classType.charAt(0).toUpperCase() + classType.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: "roomNum",
      header: "Room Number",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const roomNum = row.getValue("roomNum") as number;
        const classType = row.getValue("classType") as string;
        const hasSecuredRoom = row.original.hasSecuredRoom as boolean;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = roomNum !== prevCourse?.roomNum;
        }

        if (classType !== "online" && !hasSecuredRoom) {
          return (
            <div className="flex items-center">
              <div
                className={`${
                  hasChanged && status === "updated" && "font-bold"
                }`}
              >
                {roomNum}
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" className="hover:bg-transparent">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-100">
                  <div className="flex justify-between space-x-4">
                    <div>
                      <AlertTriangle className="text-destructive" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-destructive">
                        Warning
                      </h4>
                      <p className="text-sm">
                        The professor has not secured the room yet.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {roomNum ? roomNum : ""}
          </div>
        );
      },
    },
    {
      accessorKey: "crn",
      header: "CRN",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        const crn = row.getValue("crn") as number;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = crn !== prevCourse?.crn;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {crn}
          </div>
        );
      },
    },
    {
      accessorKey: "specialInfo",
      header: "Special Info",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        const specialInfo = row.getValue("specialInfo") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = specialInfo !== prevCourse?.specialInfo;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {specialInfo}
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        const notes = row.getValue("notes") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = notes !== prevCourse?.notes;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {notes}
          </div>
        );
      },
    },
    {
      accessorKey: "semester",
      header: "Semester",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        const semester = row.getValue("semester") as string;
        const capitalizedSemester =
          semester.charAt(0).toUpperCase() + semester.slice(1);
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = semester !== prevCourse?.semester;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {capitalizedSemester}
          </div>
        );
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const recordKey = row.getValue("recordKey") as string;
        const year = row.getValue("year") as number;
        let hasChanged: boolean = false;

        if (recordKey) {
          const prevCourse = secondLatestCourses.find(
            (course) => course?.recordKey === recordKey
          );
          hasChanged = year !== prevCourse?.year;
        }

        return (
          <div
            className={`${hasChanged && status === "updated" && "font-bold"}`}
          >
            {year.toString()}
          </div>
        );
      },
    },
    {
      accessorKey: "recordKey",
      header: "History",
      cell: ({ row }) => {
        const recordKey = row.getValue("recordKey");
        return (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push(`/course-management/${recordKey}`)}
          >
            <History className="h-5 w-5" />
          </Button>
        );
      },
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        const isPending =
          row.getValue("status") === "new" ||
          row.getValue("status") === "updated";

        return (
          <div className={`flex gap-x-2 ${isPending && "hidden"}`}>
            <UpdateCourseAlert
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
                    Are you sure you want to delete &apos;{row.getValue("label")}&apos;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => handleDelete(row.getValue("recordKey"))}
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

  const latestCourseObject = courses.reduce<{ [key: string]: Course }>(
    (acc, course) => {
      const existingCourse = acc[course.recordKey];

      if (!existingCourse || existingCourse.updatedAt < course.updatedAt) {
        acc[course.recordKey] = course;
      }

      return acc;
    },
    {}
  );

  const latestCourses = Object.values(latestCourseObject);

  return (
    <DataTable columns={columns} data={latestCourses} professors={professors} />
  );
};

export default CourseTable;
