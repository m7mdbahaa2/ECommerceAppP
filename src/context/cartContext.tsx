"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from "@/services/cart.service";

interface ICartContext {
  cartDetails: any;
  setCartDetails: React.Dispatch<React.SetStateAction<any>>;
  getCartDetails: () => Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cartDetails, setCartDetails] = useState<any>({ products: [], price: 0 });

  async function getCartDetails() {
    const res = await getUserCart();
    if (res?.success) setCartDetails(res.data?.data || { products: [], price: 0 });
    else setCartDetails({ products: [], price: 0 });
  }

  useEffect(() => { getCartDetails(); }, []);

  return <CartContext.Provider value={{ cartDetails, setCartDetails, getCartDetails }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
