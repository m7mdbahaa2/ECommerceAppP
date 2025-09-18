"use server";
import { getUserToken } from "@/lib/server.utils";

const API_URL = process.env.API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

async function withAuthRequest(url: string, options: RequestInit) {
  const token = await getUserToken();
  if (!token) throw new Error("Not logged in");
  const headers = { ...options.headers, token };
  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function getAddresses() { return await withAuthRequest(`${API_URL}/addresses`, { method: "GET" }); }
export async function getAddressById(id: string) { return await withAuthRequest(`${API_URL}/addresses/${id}`, { method: "GET" }); }
export async function addAddress(address: { name: string; details: string; phone: string; city: string }) {
  return await withAuthRequest(`${API_URL}/addresses`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(address) });
}
export async function deleteAddress(id: string) { return await withAuthRequest(`${API_URL}/addresses/${id}`, { method: "DELETE" }); }
