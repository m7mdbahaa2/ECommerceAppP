export async function getProductDetails(api:string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${api}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error as string);
    return [];
  }
}
