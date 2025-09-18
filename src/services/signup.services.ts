"use server";

import { formStateType, registerFormSchema } from "@/schema/register.schema";

export async function handleRegister(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rePassword: formData.get("rePassword") as string,
    phone: formData.get("phone") as string,
  }

  const parsedData = registerFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: "",
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Something went wrong",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Registered successfully",
    };

  } catch (error: any) {
    return {
      success: false,
      error: { general: "Internal Server Error" },
      message: "Something went wrong",
    };
  }
}
