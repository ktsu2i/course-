import { DataTable } from "@/components/DataTable";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface DeleteCourseFormProps {
  courses: Course[];
};

const DeleteCourseForm: React.FC<DeleteCourseFormProps> = ({
  courses,
}) => {
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        const department = row.getValue("department") as string;
        const courseNum = row.getValue("courseNum") as number;
        console.log(courseNum);

        return `${department.toUpperCase()} ${String(courseNum)}`;
      }
    },
    {
      accessorKey: "courseNum",
      header: "Course Number",
    },
    {
      accessorKey: "title",
      header: "Title"
    },
    {
      accessorKey: "classType",
      header: "Class Type"
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={courses} />
    </>
  );
}
 
export default DeleteCourseForm;