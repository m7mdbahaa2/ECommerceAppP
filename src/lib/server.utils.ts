"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getUserToken() {
  const session = await getServerSession(authOptions);
  console.log("session:", session); // لازم تشوف token هنا
  return session?.token || null;
}
