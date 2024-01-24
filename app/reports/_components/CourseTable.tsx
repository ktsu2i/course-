"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Course, User } from "@prisma/client";
import { ArrowUpDown, Check, X, AlertTriangle, History } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseISO, format, isBefore } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { DEPARTMENTS } from "@/lib/constants";
import { ScheduleType } from "@/lib/types";

import { DataTable } from "./DataTable";

interface CourseTableProps {
  professors: User[];
  courses: Course[];
}

const CourseTable: React.FC<CourseTableProps> = ({ professors, courses }) => {
  const router = useRouter();

  const handleAction = async (courseId: string, status: string) => {
    try {
      const course = courses.find((course) => course.id === courseId);
      await axios.patch("/api/courses", { ...course, status: status });
      toast.success("Status changed!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getSecondLatestCourses = (courses: Course[]) => {
    const groupedCourseObject = courses.reduce<{ [key: string]: Course }>((acc, course) => {
      acc[course.recordKey] = acc[course.recordKey] || [];
      acc[course.recordKey] = course;
      return acc;
    }, {});
    const groupedCourses = Object.values(groupedCourseObject);

    const secondLatestCourses = [];

    for (const key in groupedCourses) {
      const sortedCourses = groupedCourses
        .sort((a, b) => {
          const aDate = a.createdAt;
          const bDate = b.createdAt;
          return Number(isBefore(bDate, aDate));
        });
      
      if (sortedCourses.length > 1) {
        secondLatestCourses.push(sortedCourses[1]);
      }
    }

    return secondLatestCourses;
  }
  

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
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        const recordKey = row.getValue("recordKey") as string;
        let hasChanged: boolean = false;

        if (recordKey) {
          const secondLatestCourses = getSecondLatestCourses(courses);
          const prevCourse = secondLatestCourses.find(
            (course) => course.recordKey == recordKey
          );
          hasChanged = title !== prevCourse?.title;
        }

        return (
          <div className={`${hasChanged && "bg-yellow-300"}`}>
            {title}
          </div>
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
      accessorKey: "classType",
      header: "Class Type",
      cell: ({ row }) => {
        const classType = row.getValue("classType") as string;
        return classType.charAt(0).toUpperCase() + classType.slice(1);
      },
    },
    {
      accessorKey: "roomNum",
      header: "Room Number",
      cell: ({ row }) => {
        const roomNum = row.getValue("roomNum") as number;
        const classType = row.getValue("classType") as string;
        const hasSecuredRoom = row.original.hasSecuredRoom as boolean;

        if (classType !== "online" && !hasSecuredRoom) {
          return (
            <div className="flex items-center">
              <div>{roomNum}</div>
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
        return roomNum ? roomNum : "N/A";
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
      accessorKey: "recordKey",
      header: "History",
      cell: ({ row }) => {
        const recordKey = row.getValue("recordKey");
        return (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push(`/reports/${recordKey}`)}
          >
            <History className="h-5 w-5" />
          </Button>
        );
      },
    },
    {
      accessorKey: "id",
      cell: ({ row }) => {
        const status = row.getValue("status");

        return (
          <div className={`flex gap-x-2 ${status !== "new" && "hidden"}`}>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button size="sm" variant="destructive">
                  <X className="h-5 w-5 mr-1" />
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reject &apos;
                    {row.getValue("label")}
                    &apos;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => handleAction(row.getValue("id"), "rejected")}
                  >
                    Reject
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-600/90"
                >
                  <Check className="h-5 w-5 mr-1" />
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to approve &apos;
                    {row.getValue("label")}
                    &apos;?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-green-600 text-white hover:bg-green-600/90"
                    onClick={() => handleAction(row.getValue("id"), "approved")}
                  >
                    Approve
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
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

  return <DataTable columns={columns} data={latestCourses} courses={courses} />;
};

export default CourseTable;
