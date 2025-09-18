import { z } from "zod";

export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required" }),
  details: z
    .string()
    .min(2, {
      message: "street must be at least 2 characters.",
    })
    .nonempty({ message: "street is required" }),
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),

  phone: z.string().nonempty({ message: "phone is required" }),
  paymentMethod: z.enum(["cash", "card"],{
    message: "paymentMethod must be 'cash' or 'card'",
  }),
});
export type addressFormType = z.infer<typeof addressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: "",
};
export type addressFormStateType = {
  success: boolean;
  error?: {
      cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string;
};
