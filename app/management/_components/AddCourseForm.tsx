"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departments = [
  { label: "Accounting", value: "acct" },
  { label: "Advertising", value: "adv" },
  { label: "Anthropology", value: "anth" },
  { label: "Architecture", value: "arch" },
  { label: "Art", value: "artu" },
  { label: "Art History", value: "arth" },
  { label: "Asian Studies", value: "asst" },
  { label: "Biology", value: "biol" },
  { label: "Chemistry", value: "chem" },
  { label: "Chinese", value: "chi" },
  { label: "Communication Studies", value: "cmst" },
  { label: "Communication and Social Influence", value: "csi" },
  { label: "Computer & Information Science", value: "cis" },
  { label: "Dance", value: "danc" },
  { label: "Economics", value: "econ" },
  { label: "Education", value: "educ" },
  { label: "English", value: "eng" },
  { label: "Environmental Studies", value: "enst" },
  { label: "French", value: "fren" },
  { label: "Gender, Sexuality and Women Studies", value: "gsws" },
  { label: "Geography and Urban Studies", value: "gus" },
  { label: "History", value: "hist" },
  { label: "Human Resource Management", value: "hrm" },
  { label: "Intellectual Heritage", value: "ih" },
  { label: "International Bus Studies", value: "jibs" },
  { label: "Japanese", value: "jpns" },
  { label: "Journalism", value: "jrn" },
  { label: "Klein", value: "kln" },
  { label: "Korean", value: "krn" },
  { label: "Law (Undergraduate)", value: "lawu" },
  { label: "LGBT Studies", value: "lgbt" },
  { label: "Liberal Arts", value: "cla" },
  { label: "Management Information Systems", value: "mis" },
  { label: "Marketing", value: "mktg" },
  { label: "Mathematics", value: "math" },
  { label: "Media Studies & Production", value: "msp" },
  { label: "Music Studies", value: "must" },
  { label: "Philosophy", value: "phil" },
  { label: "Physical Activity", value: "actv" },
  { label: "Physics", value: "phys" },
  { label: "Political Science", value: "pols" },
  { label: "Psychology", value: "psy" },
  { label: "Religion", value: "rel" },
  { label: "Risk Management and Insurance", value: "rmi" },
  { label: "Sociology", value: "soc" },
  { label: "Spanish", value: "span" },
  { label: "Sport Tourism Hospitality management", value: "sthm" },
  { label: "Sports & Recreation Management", value: "srm" },
  { label: "Statistics", value: "stat" },
  { label: "Temple University Japan", value: "tuj" },
  { label: "Theater", value: "thtr" },
  { label: "Tourism and Hospitality Management", value: "thm" },
  { label: "University Seminar", value: "unvs" },
];

enum Semesters {
  SPRING = 0,
  SUMMER = 1,
  FALL = 2,
};

interface AddCourseFormProps {
  professors: User[] | null,
};

const courseFormSchema = z.object({
  department: z.string({
    required_error: "Please select a department",
  }),
  courseNum: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" })
    .transform(Number),
  section: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" })
    .transform(Number),
  title: z
    .string()
    .min(1, { message: "Must be at least 1 character long" }),
  crn: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" })
    .length(5, { message: "Must be a 5-digit number" })
    .transform(Number),
  instructor: z
    .string()
    .min(1, { message: "Must be at least 1 character long" }),
  isNewInstructor: z.boolean().default(false),
  classType: z.enum(["in-person", "online", "hybrid"], {
    required_error: "Please select a class type",
  }),
  roomNum: z
    .string()
    .regex(/^\d+$/, { message: "Must be a number" })
    .transform(Number)
    .optional(),
  hasSecuredRoom: z.boolean().default(false).optional(),
  dayAndTime: z.string().min(1, {
    message: "Required"
  }),
  // days: z
  //   .array(z.string())
  //   .refine((value) => value.some((day) => day), {
  //     message: "Must select at least one day",
  //   }),
  // time: z.array(z.string().min(1, {
  //   message: "Please fill out the time"
  // })),
  semester: z.string({
    required_error: "Please select a semester"
  }),
  year: z
    .string({ required_error: "Please select a year" })
    .transform(Number),
});

const AddCourseForm: React.FC<AddCourseFormProps> = ({
  professors,
}) => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      department: undefined,
      courseNum: undefined,
      section: undefined,
      title: undefined,
      crn: undefined,
      instructor: undefined,
      roomNum: undefined,
      hasSecuredRoom: false,
      dayAndTime: undefined,
      // days: [],
      semester: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const classTypeValue = form.watch("classType");
  const hasSecuredRoomValue = form.watch("hasSecuredRoom");
  // const dayValues = form.watch("days");

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    console.log(values);
  };

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-5">
              <FormLabel>Department</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox">
                      {field.value
                        ? departments.find(
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
                        {departments.map((department) => (
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
            <FormItem className="mt-5">
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
            <FormItem className="mt-5">
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
            <FormItem className="mt-5">
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
            <FormItem className="mt-5">
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
          name="instructor"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-5">
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
                            value={professor.id}
                            key={professor.id}
                            onSelect={() => {
                              form.setValue("instructor", professor.id);
                            }}
                          >
                            {professor.firstName + " " + professor.lastName}
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
            <FormItem className="mt-5">
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
        {/* <FormField
          control={form.control}
          name="days"
          render={() => (
            <FormItem className="mt-5">
              <FormLabel>Days</FormLabel>
              {days.map((day) => (
                <FormField
                  key={day.id}
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem
                      key={day.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(day.id)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, day.id])
                              : field.onChange(
                                field.value?.filter((value) => value !== day.id))
                          }}
                        />
                      </FormControl>
                      <FormLabel>{day.label}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>
          )}
        /> */}
        <div className="flex items-end">
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem className="mt-5 flex-1">
                <FormLabel>Semester</FormLabel>
                <Select onValueChange={field.onChange}>
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
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="mt-5 flex-1">
                <Select onValueChange={field.onChange}>
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
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="classType"
          render={({ field }) => (
            <FormItem className="mt-5 space-y-3">
              <FormLabel>Class Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="in-person" />
                    </FormControl>
                    <FormLabel>In-person</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="online" />
                    </FormControl>
                    <FormLabel>Online</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hybrid" />
                    </FormControl>
                    <FormLabel>Hybrid</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {classTypeValue !== "online" ? (
          <>
            <FormField
              control={form.control}
              name="roomNum"
              render={({ field }) => (
                <FormItem className="mt-5">
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
                      If not, please talk to Facilities Office ASAP to secure
                      the room.
                    </FormDescription>
                  ) : undefined}
                </FormItem>
              )}
            />
          </>
        ) : undefined}
        <Button
          className="mt-10"
          type="submit"
          disabled={!isValid || isSubmitting}
          variant="temple"
        >
          Request
        </Button>
      </form>
    </Form>
  );
};

export default AddCourseForm;