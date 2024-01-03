import {
  ColumnDef,
} from "@tanstack/react-table";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Course, User } from "@prisma/client";

import { DataTable } from "@/components/DataTable";
import { Checkbox } from "@/components/ui/checkbox";

interface DeleteCourseFormProps {
  professors: User[];
  courses: Course[];
};

const courseFormSchema = z.object({
  courses: z
    .array(z.string())
    .refine((course) => course.some((item) => item), {
      message: "Please select at least one course",
    }),
});

const DeleteCourseForm: React.FC<DeleteCourseFormProps> = ({
  professors,
  courses,
}) => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      courses: [],
    },
  });

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    console.log(values);
  };

  const columns: ColumnDef<Course>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="flex"
        />
      ),
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
            }}
            aria-label="Select row"
            className="flex"
          />
        );
      }
    },
    {
      accessorKey: "id",
      header: "courseId",
    },
    {
      accessorKey: "label",
      header: "Course (section)",
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
      }
    },
    {
      accessorKey: "crn",
      header: "CRN"
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={courses} />
    </>
  );
}
 
export default DeleteCourseForm;