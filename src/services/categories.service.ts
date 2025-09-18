export async function getCategories() {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error as string);
    return [];
  }
}
