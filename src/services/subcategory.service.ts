import { getUserToken } from "@/lib/server.utils";

const API_URL = process.env.API_Base_URL || "https://ecommerce.routemisr.com/api/v1";

async function fetchWithToken(url: string) {
  const token = await getUserToken();
  if (!token) throw new Error("Not logged in");

  const res = await fetch(url, { headers: { token } });
  const data = await res.json();

  if (!res.ok) {
    console.error("Server response:", JSON.stringify(data));
    throw new Error("Request failed");
  }
  return data;
}

// get all subcategories for a category
export async function getSubcategoriesByCategory(categoryId: string) {
  return fetchWithToken(`${API_URL}/categories/${categoryId}/subcategories`);
}

// get subcategory by id
export async function getSubcategoryById(id: string) {
  return fetchWithToken(`${API_URL}/subcategories/${id}`);
}
