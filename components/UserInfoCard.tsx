"use client";

import { User } from "@prisma/client";
import { Contact2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
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

interface UserInfoCardProps {
  currentUser: User | null;
};

const registerTuidFormSchema = z.object({
  tuid: z
    .string()
    .regex(/^\d+$/, { message: "Must be a 9-digit number" })
    .length(9, { message: "Must be a 9-digit number" })
    .transform(Number),
});

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  currentUser,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerTuidFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(registerTuidFormSchema),
    defaultValues: {
      tuid: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof registerTuidFormSchema>) => {
    try {
      await axios.post("/api/users", values);
      toast.success("Completed registration!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

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
              Register Your TUID
            </p>
            <p className="text-sm text-muted-foreground">
              Please register your TUID to complete the registration process.
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="temple">
                  Register
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Register Your TUID</SheetTitle>
                  <SheetDescription>
                    Please register your TUID to complete the registration
                    process.
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
                    <SheetClose>
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
        <div className="flex gap-x-2 mb-2">
          <div className="font-bold">Name:</div>
          <div className="text-slate-600">{currentUser?.fullName}</div>
        </div>
        <div className="flex items-center gap-x-2 mb-2">
          <div className="font-bold">Role:</div>
          <div>
            {currentUser?.isAdmin && (
              <Badge className="bg-red-400/20 text-red-700">Admin</Badge>
            )}
          </div>
          <div>
            {currentUser?.isCoordinator && (
              <Badge className="bg-blue-400/20 text-blue-700">
                Coordinator
              </Badge>
            )}
          </div>
          <div>
            {currentUser?.isFaculty && (
              <Badge className="bg-green-400/20 text-green-700">Faculty</Badge>
            )}
          </div>
          <div>
            {currentUser?.isStaff && (
              <Badge className="bg-orange-400/20 text-orange-700">Staff</Badge>
            )}
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
      </CardContent>
    </Card>
  );
}
 
export default UserInfoCard;