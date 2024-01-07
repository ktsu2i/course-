"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";

const registerTuidFormSchema = z.object({
  tuid: z
    .string()
    .regex(/^\d+$/, { message: "Must be a 9-digit number" })
    .length(9, { message: "Must be a 9-digit number" })
    .transform(Number),
});

const TuidAlert = () => {
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
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Welcome to Course Manager!</AlertTitle>
      <AlertDescription>
        <div>Register your TUID to access the functionalities.</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="mt-2"
              size="sm"
              variant="temple"
            >
              Register
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Register Your TUID</SheetTitle>
              <SheetDescription>
                Please register your TUID to complete the registration process.
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
      </AlertDescription>
    </Alert>
  );
}
 
export default TuidAlert;