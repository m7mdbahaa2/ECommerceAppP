"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { formSchema } from "@/schema/login.schema";
import { LoginFormType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(params: LoginFormType) {

    console.log("====================================");
    console.log(params);
    console.log("====================================");

    try {
      const res = await signIn("credentials", {
        email: params.email,
        password: params.password,
        redirect: false,
        // callBackUrl:'/',
      });
      console.log("res:", res);

      if (res?.ok) {
        router.push("/");
        console.log("res:", res);
        
        toast.success("Login successful");
        // e3ml toast hena w f el error
      } else {
        console.log(res?.error);
        toast.error(res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-center font-bold text-4xl mb-8">Login</h1>

          {/* ************** Email ************* */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ************** Password ************* */}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
