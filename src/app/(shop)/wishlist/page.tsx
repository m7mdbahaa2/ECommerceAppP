"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.services";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishlist() {
    setLoading(true);
    const res = await getWishlist();
    if (res.success) {
      setWishlist(res.data || []);
    } else {
      toast.error(res.message || "Failed to load wishlist");
      setWishlist([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function handleRemove(productId: string) {
    const res = await removeFromWishlist(productId);
    if (res.success) {
      toast.success("Product removed from wishlist");
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } else {
      toast.error(res.message || "Failed to remove product");
    }
  }

  async function handleAddToCart(productId: string) {
    // لو حابب تضيف زر يحول المنتج للـ cart
    // استدعي الدالة addToCart من cart.service
    toast.success("Feature not implemented yet");
  }

  if (loading) {
    return <div className="text-center py-10">Loading wishlist...</div>;
  }

  if (!wishlist.length) {
    return <div className="text-center py-10">Your wishlist is empty</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Wishlist</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item: any) => (
          <li key={item._id} className="border rounded-lg p-4 relative">
            <Badge
              className="cursor-pointer absolute top-2 right-2 p-1"
              onClick={() => handleRemove(item._id)}
            >
              <X />
            </Badge>
            <Image
              src={item.product.imageCover}
              alt={item.product.title}
              width={200}
              height={200}
              className="mb-4"
            />
            <h2 className="font-medium">{item.product.title}</h2>
            <p className="mb-2">{item.product.price} EGP</p>
            <div className="flex justify-between gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => handleAddToCart(item.product._id)}
              >
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-6">
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
