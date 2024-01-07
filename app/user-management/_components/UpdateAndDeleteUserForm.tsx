"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck, Trash2 } from "lucide-react";

import { DataTable } from "@/app/user-management/_components/DataTable";
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

import UpdateUserAlert from "./UpdateUserAlert";

interface UpdateAndDeleteUserFormProps {
  users: User[],
  currentUser: User | null,
};

const UpdateAndDeleteUserForm: React.FC<UpdateAndDeleteUserFormProps> = ({
  users,
  currentUser,
}) => {
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    try {
      const uniqueUser = users.find((user) => user.id === userId);
      const clerkUserId = uniqueUser?.clerkUserId;
      await axios.delete("/api/users", { data: { userId, clerkUserId } });
      toast.success("User deleted!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "tuid",
      header: "TUID",
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Name
          </Button>
        );
      },
    },
    {
      accessorKey: "tuMail",
      header: "TUmail",
    },
    {
      accessorKey: "isAdmin",
      header: "Admin?",
      cell: ({ row }) => {
        if (row.getValue("isAdmin")) {
          return <BadgeCheck className="h-5 w-5 mx-auto" />;
        } else {
          return <div className="text-center">---</div>;
        }
      },
    },
    {
      accessorKey: "isCoordinator",
      header: "Coordinator?",
      cell: ({ row }) => {
        if (row.getValue("isCoordinator")) {
          return <BadgeCheck className="h-5 w-5 mx-auto" />;
        } else {
          return <div className="text-center">---</div>;
        }
      },
    },
    {
      accessorKey: "isFaculty",
      header: "Faculty?",
      cell: ({ row }) => {
        if (row.getValue("isFaculty")) {
          return <BadgeCheck className="h-5 w-5 mx-auto" />;
        } else {
          return <div className="text-center">---</div>;
        }
      },
    },
    {
      accessorKey: "isStaff",
      header: "Staff?",
      cell: ({ row }) => {
        if (row.getValue("isStaff")) {
          return <BadgeCheck className="h-5 w-5 mx-auto" />;
        } else {
          return <div className="text-center">---</div>;
        }
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-2">
            <UpdateUserAlert
              users={users}
              userId={row.getValue("id")}
            />
            <AlertDialog>
              <AlertDialogTrigger
                disabled={currentUser?.id === row.getValue("id")}
              >
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={currentUser?.id === row.getValue("id")}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &apos;
                    {row.getValue("fullName")}&apos;?
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
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={users} />;
}
 
export default UpdateAndDeleteUserForm;