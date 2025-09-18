"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { addToCart } from "@/services/cart.service";

async function getCategoryProducts(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data;
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getCartDetails } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getCategoryProducts(params.id);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [params.id]);

  async function handleAddToCart(productId: string) {
    try {
      const res = await addToCart(productId);
      if (res.success) {
        await getCartDetails(); // تحديث البيانات في الكونتكست
        alert("Product added to cart");
      } else {
        alert(res.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-10">No products in this category</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 hover:shadow transition flex flex-col"
          >
            <Image
              src={product.imageCover}
              alt={product.title}
              width={200}
              height={150}
              className="object-cover rounded mb-3"
            />
            <h2 className="text-lg font-medium mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-3">${product.price}</p>
            <Button
              variant="default"
              onClick={() => handleAddToCart(product._id)}
              className="mt-auto"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
