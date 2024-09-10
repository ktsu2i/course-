"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "@/app/actions/createUser";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { signUp } from "@/app/actions/signUp";
import { signOut } from "@/app/actions/signOut";

const userFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  tuMail: z.string().email({ message: "Invalid email address" }),
  tempPassword: z.string().min(8, { message: "Must be at least 8 characters" }),
  isAdmin: z.boolean().default(false),
  isCoordinator: z.boolean().default(false),
  isFaculty: z.boolean().default(false),
  isStaff: z.boolean().default(false),
});

const AddUserDialog = () => {
  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      tuMail: undefined,
      tempPassword: undefined,
      isAdmin: false,
      isCoordinator: false,
      isFaculty: false,
      isStaff: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    await createUser(values.tuMail, values.tempPassword);
    // await signUp(values.tuMail, values.tempPassword);
    // await signOut();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="temple">
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>
            Please fill out the form below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Smith"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tuMail"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>TUmail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. example@temple.edu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel>Temporary Password</FormLabel>
                  <FormDescription>
                    User must change this password by themselves after created.
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. temp1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-6">
                  <div className="space-y-0.5">
                    <FormLabel>Admin</FormLabel>
                    <FormDescription>
                      Admin users have access to all of the features.
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-6">
                  <div className="space-y-0.5">
                    <FormLabel>Coordinator</FormLabel>
                    <FormDescription>
                      Coordinator users have access to course management and
                      cancellation.
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-6">
                  <div className="space-y-0.5">
                    <FormLabel>Faculty</FormLabel>
                    <FormDescription>
                      Faculty users only have access to course cancellation.
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-6">
                  <div className="space-y-0.5">
                    <FormLabel>Staff</FormLabel>
                    <FormDescription>
                      Staff users only have access to reports.
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
            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="temple"
                disabled={!isValid || isSubmitting}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
