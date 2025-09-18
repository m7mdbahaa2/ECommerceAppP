"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  formState,
  formStateType,
  registerFormSchema,
  RegisterFormType,
} from "@/schema/register.schema";
import { handleRegister } from "@/services/signup.services";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [action, formAction] = useActionState(handleRegister, formState);

  const router = useRouter();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  // Helper function لتجنب مشاكل TypeScript union types
  const getFieldError = (field: keyof RegisterFormType) => {
    const e = action?.error as formStateType["error"];
    return Array.isArray(e?.[field]) ? e[field]?.[0] : undefined;
  };

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message);
      }
      if (action.success && action.message) {
        toast.success(action.message);
        router.push("/signin");
      }
    }
  }, [action]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <h1 className="text-center font-bold text-4xl mb-8">Register</h1>

          {/* ************** Name ************* */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage>{getFieldError("name")}</FormMessage>
              </FormItem>
            )}
          />

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
                <FormMessage>{getFieldError("email")}</FormMessage>
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
                <FormMessage>{getFieldError("password")}</FormMessage>
              </FormItem>
            )}
          />

          {/* ************** rePassword ************* */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rePassword</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage>{getFieldError("rePassword")}</FormMessage>
              </FormItem>
            )}
          />

          {/* ************** Phone ************* */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    type="tel"
                  />
                </FormControl>
                <FormMessage>{getFieldError("phone")}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
