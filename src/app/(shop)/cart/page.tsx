"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  getUserCart,
  removeFromCart,
  removeUserCart,
  updateQtyProductCart,
} from "@/services/cart.service";

type CartProduct = {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
  count: number;
  price: number;
};

type CartDetails = {
  products: CartProduct[];
  price: number;
};

export default function CartPage() {
  const [cartDetails, setCartDetails] = useState<CartDetails>({
    products: [],
    price: 0,
  });
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    setLoading(true);
    const res = await getUserCart();

    if (res.success && "data" in res) {
      setCartDetails(res.data?.data || { products: [], price: 0 });
    } else {
      setCartDetails({ products: [], price: 0 });
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function removeCartItems() {
    const res = await removeUserCart();
    if (res.success) {
      toast.success(res.message);
      setCartDetails({ products: [], price: 0 });
    } else {
      toast.error(res.message);
    }
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    if (res.success && "data" in res) {
      toast.success(res.message);
      setCartDetails(res.data?.data || { products: [], price: 0 });
    } else {
      toast.error(res.message);
    }
  }

  async function updateQuantityProductCart(productId: string, count: number) {
    if (count < 1) return;
    const res = await updateQtyProductCart(productId, count);
    if (res.success && "data" in res) {
      toast.success(res.message);
      setCartDetails(res.data?.data || { products: [], price: 0 });
    } else {
      toast.error(res.message);
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading cart...</div>;
  }

  if (!cartDetails || cartDetails.products.length === 0) {
    return <div className="text-center py-10">Your cart is empty</div>;
  }

  const subTotal = cartDetails.products.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <section className="mb-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartDetails.products.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium relative">
                <button
                  className="absolute top-2 right-2 p-1 text-red-600"
                  onClick={() => removeProductFromCart(item.product._id)}
                >
                  <X size={18} />
                </button>
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={100}
                  height={100}
                />
                <h2>{item.product.title}</h2>
              </TableCell>
              <TableCell>{item.price} EGP</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() =>
                      updateQuantityProductCart(
                        item.product._id,
                        item.count - 1
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    -
                  </Button>
                  {item.count}
                  <Button
                    onClick={() =>
                      updateQuantityProductCart(
                        item.product._id,
                        item.count + 1
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {item.price * item.count} EGP
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-6">
        <Button variant="outline" asChild>
          <Link href="/products">Return to Shop</Link>
        </Button>
        <Button onClick={removeCartItems} variant="destructive">
          Remove All
        </Button>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between w-5/12 gap-4 mb-6">
          <Input placeholder="Coupon Code" />
          <Button variant="destructive">Apply</Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between">
              <span>SubTotal:</span>
              <span>{subTotal} EGP</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </li>
            <li className="py-3 flex justify-between font-bold">
              <span>Total:</span>
              <span>{subTotal} EGP</span>
            </li>
          </ul>

          <div className="flex justify-center mt-6">
            <Button variant="destructive" asChild>
              <Link href="/checkout">Go To Checkout</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
