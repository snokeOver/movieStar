"use client";
import { Button } from "./ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { SearchBoxProps } from "@/type_interface/interfaces";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

const SearchBox = ({ showFullSearch, setShowFullSearch }: SearchBoxProps) => {
  const formSchema = z.object({
    input: z.string().min(2).max(30),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  return (
    <div
      className={`md:flex gap-4 justify-center flex-grow  ${
        showFullSearch ? "flex" : "hidden"
      }`}
    >
      <Button
        type="submit"
        variant={"ghost"}
        size={"icon"}
        className={`flex-shrink-0 ${
          showFullSearch ? "flex" : "hidden"
        } text-secondary-text border border-secondary-border rounded-full`}
        onClick={() => setShowFullSearch(false)}
      >
        <ArrowLeft />
      </Button>
      <div className="flex flex-grow max-w-[600px]">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search ... "
                      {...field}
                      className="rounded-l-full border border-secondary-border py-1 px-4 w-full focus:border-blue-300 outline-none bg-gray-900 text-secondary-text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button className="flex-shrink-0 border border-secondary-border rounded-r-full border-l-0 py-1 px-4">
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
