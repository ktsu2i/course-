"use client";

import { Contact2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { DEPARTMENTS } from "@/lib/constants";
import { User } from "@/lib/types";

interface UserInfoCardProps {
  currentUser: User | null;
}

const userRegistrationFormSchema = z.object({
  tuid: z
    .string()
    .regex(/^\d+$/, { message: "Must be a 9-digit number" })
    .length(9, { message: "Must be a 9-digit number" })
    .transform(Number),
  department: z.string({
    required_error: "Please select a department",
  }),
});

const UserInfoCard: React.FC<UserInfoCardProps> = ({ currentUser }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof userRegistrationFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userRegistrationFormSchema),
    defaultValues: {
      tuid: undefined,
      department: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (
    values: z.infer<typeof userRegistrationFormSchema>
  ) => {
    try {
      await axios.post("/api/users", values);
      toast.success("Completed registration!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const isAdmin = currentUser?.isAdmin;
  const isCoordinator = currentUser?.isCoordinator;
  const isFaculty = currentUser?.isFaculty;
  const isStaff = currentUser?.isStaff;
  const isGuest = !isAdmin && !isCoordinator && !isFaculty && !isStaff;

  const department = DEPARTMENTS.find(
    (department) => department.value === currentUser?.department
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
        <CardDescription>
          Only coordinators can update users&apos; information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`flex items-center space-x-4 rounded-md border p-4 mb-4 ${
            currentUser && "hidden"
          }`}
        >
          <Contact2 />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium leading-none">
              Complete Your Registration
            </p>
            <p className="text-sm text-muted-foreground">
              Please register your TUID and department to complete the
              registration process.
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="temple">
                  Register
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Complete Your Registration</SheetTitle>
                  <SheetDescription>
                    Please register your TUID and department to complete the
                    registration process.
                  </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="tuid"
                      render={({ field }) => (
                        <FormItem className="mt-5">
                          <FormLabel>TUID</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter your TUID"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-6">
                          <FormLabel>Your Department</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" role="combobox">
                                  {field.value
                                    ? DEPARTMENTS.find(
                                        (department) =>
                                          department.value === field.value
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
                                <CommandEmpty>
                                  No department found.
                                </CommandEmpty>
                                <ScrollArea className="h-[300px]">
                                  <CommandGroup>
                                    {DEPARTMENTS.map((department) => (
                                      <CommandItem
                                        value={department.label}
                                        key={department.value}
                                        onSelect={() => {
                                          form.setValue(
                                            "department",
                                            department.value
                                          );
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
                    <SheetClose disabled={!isValid || isSubmitting}>
                      <Button
                        className="mt-5"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        variant="temple"
                      >
                        Register
                      </Button>
                    </SheetClose>
                  </form>
                </Form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className={`${!currentUser && "hidden"}`}>
          <div className="flex gap-x-2 mb-2">
            <div className="font-bold">Name:</div>
            <div className="text-slate-600">{currentUser?.firstName + " " + currentUser?.lastName}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="font-bold">Role:</div>
            {isAdmin && (
              <Badge className="bg-red-400/20 text-red-700 ml-2">Admin</Badge>
            )}
            {isCoordinator && (
              <Badge className="bg-blue-400/20 text-blue-700 ml-2">
                Coordinator
              </Badge>
            )}
            {isFaculty && (
              <Badge className="bg-green-400/20 text-green-700 ml-2">
                Faculty
              </Badge>
            )}
            {isStaff && (
              <Badge className="bg-orange-400/20 text-orange-700 ml-2">
                Staff
              </Badge>
            )}
            {isGuest && (
              <Badge className="bg-gray-400/20 text-gray-700 ml-2">Guest</Badge>
            )}
          </div>
          <div className="flex gap-x-2 mb-2">
            <div className="font-bold">Department:</div>
            <div className="text-slate-600">
              {department?.label} ({department?.value.toUpperCase()})
            </div>
          </div>
          <div className="flex gap-x-2 mb-2">
            <div className="font-bold">TUID:</div>
            <div className="text-slate-600">{currentUser?.tuid}</div>
          </div>
          <div className="flex gap-x-2">
            <div className="font-bold">TUmail:</div>
            <div className="text-slate-600">{currentUser?.tuMail}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
