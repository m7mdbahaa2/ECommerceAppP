import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
} from "@/interface/forgotPassword.interface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function forgotPassword(
  payload: IForgotPasswordRequest
): Promise<IForgotPasswordResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/forgotPasswords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send forgot password request");
  }

  return res.json();
}
