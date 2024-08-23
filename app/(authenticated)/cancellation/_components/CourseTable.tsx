"use client";

import { Course, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon } from "lucide-react";
import { parseISO, format, add } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { ScheduleType } from "@/lib/types";
import { DAY_NAMES } from "@/lib/constants";

import { DataTable } from "./DataTable";
import { Checkbox } from "@/components/ui/checkbox";

interface CourseTableProps {
  courses: Course[];
  currentUser: User | null;
}

const FormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
});

const CourseTable: React.FC<CourseTableProps> = ({ courses, currentUser }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
    }
  });

  const pickedDate: Date = form.watch("date");
  const dayNum: number = pickedDate?.getDay();
  const today = DAY_NAMES[dayNum];

  const columns: ColumnDef<Course>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="flex items-center"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="flex items-center"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
  ];

  // get all latestCourses
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

  // filter only user's approved courses
  const userCourses = latestCourses.filter(
    (course) => course.userId === currentUser?.id && course.status === "approved"
  );

  // filter courses by current semester and year
  // 0-3 (January to April): Spring
  // 4-6 (May to July): Summer
  // 8-11 (September to December): Fall
  const coursesFilteredBySemesterAndYear = userCourses.filter((course) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let currentSemester: string;

    // determine the current semester
    if (0 <= currentMonth && currentMonth <= 3) {
      currentSemester = "spring";
    } else if (4 <= currentMonth && currentMonth <= 6) {
      currentSemester = "summer";
    } else {
      currentSemester = "fall";
    }

    return course.semester === currentSemester && course.year === currentYear;
  });

  const todayCourses = coursesFilteredBySemesterAndYear.filter((course) => {
    if (today && course.schedule) {
      const schedule = course.schedule as ScheduleType;
      if (schedule.monday && today === "monday") return course;
      if (schedule.tuesday && today === "tuesday") return course;
      if (schedule.wednesday && today === "wednesday") return course;
      if (schedule.thursday && today === "thursday") return course;
      if (schedule.friday && today === "friday") return course;
    }

    return null;
  });

  return (
    <div className="flex flex-col space-y-10">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="mt-6 flex flex-col max-w-60">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const prevDate = add(new Date(), { days: -1 });
                        return date < prevDate || date < new Date("1900-01-01");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DataTable columns={columns} data={todayCourses} />
    </div>
  );
};

export default CourseTable;
