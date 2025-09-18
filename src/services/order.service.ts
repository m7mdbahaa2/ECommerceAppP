"use server";
import { getUserToken } from "@/lib/server.utils";

const API_URL = process.env.API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export async function getAllOrders() {
  const token = await getUserToken();
  const res = await fetch(`${API_URL}/orders`, { headers: { token: token as string }, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = await res.json();
  return data.data || [];
}

export async function getUserOrders(userId: string) {
  const token = await getUserToken();
  const res = await fetch(`${API_URL}/orders/user/${userId}`, { headers: { token: token as string }, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch user orders");
  const data = await res.json();
  return data.data || [];
}

export async function createOrder(cartId: string, shippingAddress: any) {
  const token = await getUserToken();
  const res = await fetch(`${API_URL}/orders/${cartId}`, { method: "POST", headers: { "Content-Type": "application/json", token: token as string }, body: JSON.stringify({ shippingAddress }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create order");
  return data;
}

export async function checkoutSession(cartId: string, shippingAddress: any) {
  const token = await getUserToken();
  const url = process.env.NEXTAUTH_URL;
  const res = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=${url}`, { method: "POST", headers: { "Content-Type": "application/json", token: token as string }, body: JSON.stringify({ shippingAddress }) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Checkout failed");
  return data.session.url;
}
