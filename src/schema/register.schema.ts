import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "name must be at least 2 characters.",
      })
      .nonempty({ message: "name is required" }),
    email: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .nonempty({ message: "password is required" }),
    rePassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    phone: z.string().nonempty({ message: "phone is required" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: "",
};
export type formStateType = {
  success: boolean;
  error?: {
    general?: string;
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string;
};
