// "use client";

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Course } from "@prisma/client";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import getCourseById from "@/app/actions/getCourseById";

// interface DeleteCourseFormProps {
//   courses: Course[] | null;
// }

// const courseFormSchema = z.object({
//   // semester: z.string({
//   //   required_error: "Please select a semester"
//   // }),
//   // year: z.string({
//   //   required_error: "Please select a year"
//   // }).transform(Number),
//   courseId: z.string({
//     required_error: "Please select a course",
//   }),
// });
// //   .refine(async ({ semester, year, courseId }) => {
// //   const course = await getCourseById(courseId);

// //   if (course?.semester === semester && course?.year === year) {
// //     return true;
// //   } else {
// //     return false;
// //   }
// // }, {
// //   message: "There doesn't exist such a course.",
// //   path: ["courseId"],
// // });

// const DeleteCourseForm: React.FC<DeleteCourseFormProps> = ({ courses }) => {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof courseFormSchema>>({
//     mode: "onChange",
//     resolver: zodResolver(courseFormSchema),
//     defaultValues: {
//       // semester: undefined,
//       // year: undefined,
//       courseId: undefined,
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   // const semesterValue = form.watch("semester");
//   // const yearValue = form.watch("year");

//   // const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
//   //   try {
//   //     await axios.delete("/api/courses", { data: values });
//   //     router.push("/");
//   //     toast.success("Course deleted!");
//   //   } catch {
//   //     toast.error("Something went wrong");
//   //   }
//   // };

//   const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
//     console.log(values);
//   };

//   const currentYear = new Date().getFullYear();
//   const nextYear = currentYear + 1;

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         {/* <div className="flex items-end">
//           <FormField
//             control={form.control}
//             name="semester"
//             render={({ field }) => (
//               <FormItem className="mt-6 flex-1">
//                 <FormLabel>Semester</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a semester" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="spring">Spring</SelectItem>
//                     <SelectItem value="summer">Summer</SelectItem>
//                     <SelectItem value="fall">Fall</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="year"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a year"/>
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value={currentYear.toString()}>
//                       {currentYear}
//                     </SelectItem>
//                     <SelectItem value={nextYear.toString()}>
//                       {nextYear}
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />
//         </div> */}
//         <FormField
//           control={form.control}
//           name="courseId"
//           render={({ field }) => (
//             <FormItem className="flex flex-col mt-6">
//               <FormLabel>Course</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button variant="outline" role="combobox">
//                       {field.value
//                         ? courses?.find((course) => course.id === field.value)
//                             ?.label
//                         : "Select a course"}
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[420px] p-0">
//                   <Command>
//                     <CommandInput
//                       placeholder="Search course..."
//                       className="h-9"
//                     />
//                     <CommandEmpty>No course found.</CommandEmpty>
//                     <ScrollArea className="h-[300px]">
//                       <CommandGroup>
//                         {/* {courses?.filter((course) => {
//                           return course.semester === semesterValue && course.year === Number(yearValue);
//                         }).map((course) => (
//                           <CommandItem
//                             value={course.label}
//                             key={course.id}
//                             onSelect={() => {
//                               form.setValue("courseId", course.id);
//                             }}
//                           >
//                             {course.label}
//                           </CommandItem>
//                         ))} */}
//                         {courses?.map((course) => (
//                           <CommandItem
//                             value={course.label}
//                             key={course.id}
//                             onSelect={() => {
//                               form.setValue("courseId", course.id);
//                             }}
//                           >
//                             {course.label}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                       <ScrollBar orientation="vertical" />
//                     </ScrollArea>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           className="mt-10 mb-20"
//           disabled={!isValid || isSubmitting}
//           variant="temple"
//         >
//           Request
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default DeleteCourseForm;
