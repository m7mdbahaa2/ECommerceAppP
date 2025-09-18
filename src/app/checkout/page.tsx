"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useCart } from "@/context/cartContext";
import {
  addressFormSchema,
  addressFormType,
} from "@/schema/address.schema";
import { createOrder } from "@/services/order.service";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: cartDetails?.cartId || "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  async function onSubmit(values: addressFormType) {
    if (!cartDetails?.cartId) {
      toast.error("Cart is empty");
      return;
    }
    setLoading(true);
    try {
      const shippingAddress = {
        details: values.details,
        city: values.city,
        phone: values.phone,
      };
      const res = await createOrder(cartDetails.cartId, shippingAddress, values.paymentMethod as any);

      if (res.success) {
        toast.success("Order created successfully");
        setCartDetails({ products: [], price: 0 });
        if (values.paymentMethod === "cash") {
          router.push("/allorders");
        } else {
          window.location.href = res.session?.url || "/";
        }
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-center font-bold text-4xl mb-8">Checkout</h1>

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <RadioGroup {...field} defaultValue="cash" name={field.name}>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit Card</Label>
                    </div>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
