"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { User } from "@prisma/client";
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
import { Switch } from "@/components/ui/switch";

interface UpdateUserAlertProps {
  users: User[];
  userId: string;
  disabled: boolean;
};

const userFormSchema = z.object({
  tuid: z
    .coerce
    .number()
    .gte(100000000, { message: "Must be a 9-digit number" })
    .lte(999999999, { message: "Must be a 9-digit number" }),
  firstName: z.string().min(1, {
    message: "Required"
  }),
  lastName: z.string().min(1, {
    message: "Required",
  }),
  isAdmin: z.boolean(),
  isCoordinator: z.boolean(),
  isFaculty: z.boolean(),
  isStaff: z.boolean(),
});

const UpdateUserAlert: React.FC<UpdateUserAlertProps> = ({
  users,
  userId,
  disabled,
}) => {
  const router = useRouter();
  const uniqueUser = users.find((user) => user.id === userId);

  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      tuid: uniqueUser?.tuid,
      firstName: uniqueUser?.firstName,
      lastName: uniqueUser?.lastName,
      isAdmin: uniqueUser?.isAdmin,
      isCoordinator: uniqueUser?.isCoordinator,
      isFaculty: uniqueUser?.isFaculty,
      isStaff: uniqueUser?.isStaff,
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      await axios.patch("/api/users", { id: userId, clerkUserId: uniqueUser?.clerkUserId, ...values });
      toast.success("User updated!");
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update &apos;{uniqueUser?.fullName}&apos;</AlertDialogTitle>
          <AlertDialogDescription>
            Please make changes below to update the information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="tuid"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>TUID</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>First</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="First"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Last</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Last"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <FormLabel>Admin</FormLabel>
                    <FormDescription className="mr-10">
                      Has full access to all of the functionalities including
                      adding/updating/deleting users
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCoordinator"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <FormLabel>Coordinator</FormLabel>
                    <FormDescription className="mr-10">
                      Have access to course management for the entire semesters
                      and course cancellation for a particular day
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFaculty"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <FormLabel>Faculty</FormLabel>
                    <FormDescription className="mr-10">
                      Have access to course cancellation for a particular day
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isStaff"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <FormLabel>Staff</FormLabel>
                    <FormDescription className="mr-10">
                      Have access to reports of all the courses and exporting the data to Excel file
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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
}
 
export default UpdateUserAlert;