"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const logInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, { message: "Password is too short" }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  

  const onSubmit = async (values: z.infer<typeof logInSchema>) => {
    const toastId = toast.loading("Signing you in...");
    try {
      const res = await signIn("credentials", {
        ...values
      });
      toast.success("✅ Signed in successfully", { id: toastId });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center">Login</h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
