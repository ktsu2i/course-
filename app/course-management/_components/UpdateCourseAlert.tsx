"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Course, User } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DEPARTMENTS } from "@/lib/constants";

interface UpdateCourseAlertProps {
  disabled: boolean;
  professors: User[];
  courses: Course[];
  courseId: string;
}

const courseFormSchema = z
  .object({
    department: z.string({
      required_error: "Please select a department",
    }),
    courseNum: z.coerce.number({
      required_error: "Must be a number",
    }),
    section: z.coerce.number({
      required_error: "Must be a number",
    }),
    title: z.string().min(1, { message: "Must be at least 1 character long" }),
    crn: z.coerce
      .number()
      .gte(10000, { message: "Must be a 5-digit number" })
      .lte(99999, { message: "Must be a 5-digit number" }),
    credits: z.string(),
    instructorId: z.string().min(1),
    isNewInstructor: z.boolean().default(false),
    classType: z.enum(["in-person", "online", "hybrid"], {
      required_error: "Please select a class type",
    }),
    roomNum: z.coerce.number().optional(),
    hasSecuredRoom: z.boolean().default(false).optional(),
    dayAndTime: z.string().min(1, {
      message: "Required",
    }),
    semester: z.string({
      required_error: "Please select a semester",
    }),
    // year: z.coerce.number({
    //   required_error: "Must be a number",
    // }),
    year: z.string(),
    customYear: z
      .coerce
      .number({ required_error: "Must be a number" })
      .optional(),
    specialInfo: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(({ classType, roomNum }) => {
      if (classType !== "online" && !roomNum) {
        return false;
      } else {
        return true;
      }
    }, {
      message: "Required",
      path: ["roomNUm"],
  })
  .refine(({ year, customYear }) => {
    if (year === "other" && !customYear) {
      return false;
    } else {
      return true;
    }
  }, {
    message: "Required",
    path: ["year"],
  });

const UpdateCourseAlert: React.FC<UpdateCourseAlertProps> = ({
  disabled,
  professors,
  courses,
  courseId,
}) => {
  const router = useRouter();
  const uniqueCourse = courses.find((course) => course.id === courseId);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  let defaultRoomNum: number | undefined;
  if (uniqueCourse?.roomNum) {
    defaultRoomNum = uniqueCourse.roomNum;
  } else {
    defaultRoomNum = undefined;
  }

  let defaultHasSecuredRoom: boolean | undefined;
  if (uniqueCourse?.hasSecuredRoom) {
    defaultHasSecuredRoom = uniqueCourse.hasSecuredRoom;
  } else {
    defaultHasSecuredRoom = false;
  }

  let defaultYear: string | undefined;
  if (uniqueCourse?.year === currentYear) {
    defaultYear = currentYear.toString();
  } else if (uniqueCourse?.year === nextYear) {
    defaultYear = nextYear.toString();
  } else {
    defaultYear = "other";
  }

  let defaultCustomYear: number | undefined;
  if (defaultYear === "other") {
    defaultCustomYear = uniqueCourse?.year;
  } else {
    defaultCustomYear = undefined;
  }

  let defaultSpecialInfo: string | undefined;
  if (uniqueCourse?.specialInfo) {
    defaultSpecialInfo = uniqueCourse.specialInfo;
  } else {
    defaultSpecialInfo = undefined;
  }

  let defaultNotes: string | undefined;
  if (uniqueCourse?.notes) {
    defaultNotes = uniqueCourse.notes;
  } else {
    defaultNotes = undefined;
  }

  let defaultClassType: "in-person" | "online" | "hybrid" | undefined;
  if (
    ["in-person", "online", "hybrid", undefined].includes(
      uniqueCourse?.classType
    )
  ) {
    defaultClassType = uniqueCourse?.classType as
      | "in-person"
      | "online"
      | "hybrid"
      | undefined;
  } else {
    defaultClassType = undefined;
  }

  const form = useForm<z.infer<typeof courseFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      department: uniqueCourse?.department,
      courseNum: uniqueCourse?.courseNum,
      section: uniqueCourse?.section,
      title: uniqueCourse?.title,
      crn: uniqueCourse?.crn,
      credits: uniqueCourse?.credits.toString(),
      instructorId: uniqueCourse?.userId,
      isNewInstructor: uniqueCourse?.isNewInstructor,
      classType: defaultClassType,
      roomNum: defaultRoomNum,
      hasSecuredRoom: defaultHasSecuredRoom,
      dayAndTime: uniqueCourse?.dayAndTime,
      semester: uniqueCourse?.semester,
      year: defaultYear,
      customYear: defaultCustomYear,
      specialInfo: defaultSpecialInfo,
      notes: defaultNotes,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const yearValue = form.watch("year").toString();
  const classTypeValue = form.watch("classType");
  const hasSecuredRoomValue = form.watch("hasSecuredRoom");

  const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
    try {
      await axios.patch("/api/courses", { id: courseId, ...values });
      toast.success("Course updated!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disabled}>
        <Button size="sm" variant="ghost" disabled={disabled}>
          <Pencil className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[1200px] max-w-[600px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Update &apos;{uniqueCourse?.label}&apos;
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please make changes below to update the information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Department</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox">
                          {field.value
                            ? DEPARTMENTS.find(
                                (department) => department.value === field.value
                              )?.label
                            : "Select a department"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search department..."
                          className="h-9"
                        />
                        <CommandEmpty>No department found.</CommandEmpty>
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {DEPARTMENTS.map((department) => (
                              <CommandItem
                                value={department.label}
                                key={department.value}
                                onSelect={() => {
                                  form.setValue("department", department.value);
                                }}
                              >
                                {department.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseNum"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Course Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 851"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 750"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'IH I: The Good Life'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crn"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>CRN</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 49420"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem className="mt-6 flex-1">
                  <FormLabel>Credits</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credits" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructorId"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Instructor</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox">
                          {field.value
                            ? professors?.find(
                                (professor) => professor.id === field.value
                              )?.fullName
                            : "Select an instructor"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search professor..."
                          className="h-9"
                        />
                        <CommandEmpty>No professor found.</CommandEmpty>
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {professors?.map((professor) => (
                              <CommandItem
                                value={professor.fullName}
                                key={professor.id}
                                onSelect={() => {
                                  form.setValue("instructorId", professor.id);
                                }}
                              >
                                {professor.fullName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <ScrollBar orientation="vertical" />
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isNewInstructor"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <div className="flex items-center space-x-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Approved as a new hire by the ADAA</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dayAndTime"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Day & Time</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. TTh 12:00-13:30"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter &apos;Asynchronous&apos; if provided asynchronously
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem className="mt-6 flex-1">
                    <FormLabel>Semester</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="fall">Fall</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 20XX"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={currentYear.toString()}>
                          {currentYear}
                        </SelectItem>
                        <SelectItem value={nextYear.toString()}>
                          {nextYear}
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customYear"
                render={({ field }) => (
                  <FormItem
                    className={`flex-1 ${yearValue !== "other" && "hidden"}`}
                  >
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 2040"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="classType"
              render={({ field }) => (
                <FormItem className="mt-6 flex-1">
                  <FormLabel>Class Type</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {classTypeValue !== "online" ? (
              <>
                <FormField
                  control={form.control}
                  name="roomNum"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 604"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasSecuredRoom"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <div className="flex items-center space-x-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Already secured the room</FormLabel>
                      </div>
                      {!hasSecuredRoomValue ? (
                        <FormDescription>
                          If not, please talk to Facilities Office ASAP to
                          secure the room.
                        </FormDescription>
                      ) : undefined}
                    </FormItem>
                  )}
                />
              </>
            ) : undefined}
            <FormField
              control={form.control}
              name="specialInfo"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Special Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Cross-list, Media Fees, Special Permission, Extra Studio Time, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be indicated on the &apos;Special Info&apos;
                    column on the website.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any other notes or comments"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialogFooter className="mt-10">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                variant="temple"
                disabled={!isValid || isSubmitting}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateCourseAlert;
