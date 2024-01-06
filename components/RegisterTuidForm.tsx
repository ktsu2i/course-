"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerTuidFormSchema = z.object({
  tuid: z
    .string()
    .regex(/^\d+$/, { message: "Must be a 9-digit number" })
    .length(9, { message: "Must be a 9-digit number" })
    .transform(Number),
});

const RegisterTuidForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerTuidFormSchema>>({
    resolver: zodResolver(registerTuidFormSchema),
    defaultValues: {
      tuid: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof registerTuidFormSchema>) => {
    try {
      await axios.post("/api/users", values);
      toast.success("Your TUID registered!");
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Register Your TUID</FormLabel>
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
        <div className="mt-5">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="temple"
          >
            Done
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterTuidForm;
