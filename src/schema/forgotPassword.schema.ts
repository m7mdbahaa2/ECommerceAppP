import * as zod from "zod";

export const forgotPasswordSchema = zod.object({
  email: zod.string().email("Invalid email address").nonempty("Email is required"),
});

