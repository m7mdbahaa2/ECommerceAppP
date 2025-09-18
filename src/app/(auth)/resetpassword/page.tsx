"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/schema/resetPassword.schema";
import { IResetPasswordRequest } from "@/interface/resetPassword.interface";
import { resetPassword } from "@/services/resetPassword.service";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordRequest>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: IResetPasswordRequest) => {
    try {
      const res = await resetPassword(data);
      setMessage("Password updated successfully");
      console.log(res);
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
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

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full border rounded p-2"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("rePassword")}
            className="w-full border rounded p-2"
          />
          {errors.rePassword && (
            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Reset Code</label>
          <input
            type="text"
            {...register("resetCode")}
            className="w-full border rounded p-2"
          />
          {errors.resetCode && (
            <p className="text-red-500 text-sm">{errors.resetCode.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
