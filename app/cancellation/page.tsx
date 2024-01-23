"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { add, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { DAY_NAMES } from "@/lib/constants";

const FormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
});

const CancellationPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
    }
  });

  const pickedDate: Date = form.watch("date");
  const dayNum: number = pickedDate?.getDay();
  const day = DAY_NAMES[dayNum];

  return (
    <div className="max-w-[1800px] mt-[85px] px-10">
      <h1 className="text-2xl font-bold">Cancel Classes</h1>
      <p className="text-slate-600 mt-1">
        You can cancel classes due to sickness and so on.
      </p>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="mt-6 flex flex-col max-w-60">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const prevDate = add(new Date(), { days: -1 });
                        return date < prevDate || date < new Date("1900-01-01")
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-6 font-semibold">
        The picked date is {day}.
      </div>
    </div>
  );
};
 
export default CancellationPage;