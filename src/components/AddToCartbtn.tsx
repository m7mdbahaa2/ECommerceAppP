"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
import { is } from "zod/v4/locales";
import { LoaderCircle } from "lucide-react";

export default function AddToCartbtn({ productId }: { productId: string }) {
  const { setCartDetails, getCartDetails } = useCart();
  const [isPending, startTransition] = useTransition();

  async function addProductToCart(productId: string) {
    startTransition(async () => {
      const res = await addToCart(productId);
      console.log(res);

      if (res?.success) {
        toast.success(res.message);
        getCartDetails();
      } else {
        toast.error("Failed to add to cart");
      }
    });
  }
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => addProductToCart(productId)}
        className="w-full mb-2"
        variant="outline"
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : "Add to Cart"}
      </Button>
    </div>
  );
}
