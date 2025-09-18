import { IResetPasswordRequest, IResetPasswordResponse } from "@/interface/resetPassword.interface";

export async function resetPassword(
  data: IResetPasswordRequest
): Promise<IResetPasswordResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to reset password");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
