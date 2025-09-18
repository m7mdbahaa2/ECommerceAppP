import * as zod from "zod";

export const resetPasswordSchema = zod
  .object({
    email: zod
      .string()
      .email("Enter a valid email")
      .nonempty("Email is required"),
    newPassword: zod
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("New password is required"),
    rePassword: zod
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Re-enter password is required"),
    resetCode: zod.string().nonempty("Reset code is required"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
