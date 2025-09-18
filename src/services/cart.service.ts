"use server";
import { getUserToken } from "@/lib/server.utils";

async function handleRequest(url: string, options: RequestInit, successMessage: string) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return { data, success: true, message: successMessage };
}

export async function getUserCart() {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    return await handleRequest(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      { headers: { token } },
      "Cart fetched successfully"
    );
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    return await handleRequest(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      { method: "POST", headers: { "Content-Type": "application/json", token }, body: JSON.stringify({ productId }) },
      "Product added to cart successfully"
    );
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    return await handleRequest(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      { method: "DELETE", headers: { "Content-Type": "application/json", token } },
      "Product removed from cart successfully"
    );
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function updateQtyProductCart(productId: string, count: number) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    return await handleRequest(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      { method: "PUT", headers: { "Content-Type": "application/json", token }, body: JSON.stringify({ count }) },
      "Product quantity updated successfully"
    );
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export async function removeUserCart() {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");
    return await handleRequest(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      { method: "DELETE", headers: { token } },
      "Cart removed successfully"
    );
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
