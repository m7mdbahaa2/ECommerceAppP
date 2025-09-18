"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/schema/forgotPassword.schema";
import { IForgotPasswordRequest } from "@/interface/forgotPassword.interface";
import { forgotPassword } from "@/services/forgotPassword.service";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPasswordRequest>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: IForgotPasswordRequest) => {
    try {
      const res = await forgotPassword(data);
      setMessage(res.message);
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
