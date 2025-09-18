"use server";
import { getUserToken } from "@/lib/server.utils";

export async function getWishlist() {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, { headers: { token }, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch wishlist");
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function addToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add product to wishlist");
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist/${productId}`, { method: "DELETE", headers: { token } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to remove product from wishlist");
    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
