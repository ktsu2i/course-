import { Course, User } from "@prisma/client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface DeleteCourseFormProps {
  courses: Course[],
  professors: User[],
};

const courseFormSchema = z.object({
  courseIds: z
    .array(z.string())
    .refine((courseId) => courseId.some((item) => item), {
      message: "Please select a course at least one course",
    }),
});

const DeleteCourseForm: React.FC<DeleteCourseFormProps> = ({
  courses,
  professors,
}) => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      courseIds: [],
    },
  });

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="courseIds"
          render={() => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormDescription>Delete course(s)</FormDescription>
              {courses.map((course) => (
                <FormField
                  key={course.id}
                  control={form.control}
                  name="courseIds"
                  render={({ field }) => (
                    <FormItem key={course.id}>
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(course.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, course.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== course.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel>
                        {course.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Delete</Button>
      </form>
    </Form>
  );
}
 
export default DeleteCourseForm;