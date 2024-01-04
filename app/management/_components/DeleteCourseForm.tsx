import {
  ColumnDef,
} from "@tanstack/react-table";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Course, User } from "@prisma/client";

import { DataTable } from "@/components/DataTable";
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


interface DeleteCourseFormProps {
  professors: User[];
  courses: Course[];
};

const DeleteCourseForm: React.FC<DeleteCourseFormProps> = ({
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
    {
      accessorKey: "semester",
      header: "Semester",
      cell: ({ row }) => {
        const semester = row.getValue("semester") as string;
        const capitalizedSemester = semester.charAt(0).toUpperCase() + semester.slice(1);

        return capitalizedSemester;
      }
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          // <Button
          //   size="sm"
          //   type="button"
          //   variant="destructive"
          //   onClick={() => handleDelete(row.getValue("id"))}
          // >
          //   <Trash2 className="h-5 w-5" />
          // </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Confirmation
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &apos;{row.getValue("label")}&apos;?
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
        );
      }
    }
  ];

  return  <DataTable columns={columns} data={courses} />;
}

export default DeleteCourseForm;