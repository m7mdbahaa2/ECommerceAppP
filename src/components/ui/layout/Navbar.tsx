"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import { getWishlist } from "@/services/wishlist.services";

const links = [
  { name: "Home", path: "/" },
  { name: "Brands", path: "/brands" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartDetails } = useCart();
  const [wishlist, setWishlist] = useState<any[]>([]);

  const totalItemsInCart =
    cartDetails?.products?.reduce((acc, item) => acc + (item.count || 0), 0) ||
    0;

  useEffect(() => {
    async function fetchWishlist() {
      const res = await getWishlist();
      if (res?.success) setWishlist(res.data || []);
      else setWishlist([]);
    }
    if (session) fetchWishlist();
  }, [session]);

  return (
    <section className="py-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>

          {/* Desktop */}
          <NavigationMenu className="hidden lg:flex items-center gap-6">
            <NavigationMenuList>
              {links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.path}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>

            <div className="flex items-center gap-4">
              {status === "loading" ? (
                <span>loading...</span>
              ) : status === "unauthenticated" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/signin">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/wishlist" className="font-medium relative">
                    <Badge
                      variant="destructive"
                      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2"
                    >
                      {wishlist.length}
                    </Badge>
                    <Heart className="size-6" />
                  </Link>

                  <Link href="/cart" className="font-medium relative">
                    <Badge
                      variant="destructive"
                      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2"
                    >
                      {totalItemsInCart}
                    </Badge>
                    <ShoppingCart className="size-6" />
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <User className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/signin" })}
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </NavigationMenu>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link, idx) => (
                    <Link href={link.path} key={idx} className="font-medium">
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {status === "loading" ? (
                    <span>loading...</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/signin">Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link href="/wishlist" className="font-medium relative">
                        <Badge
                          variant="destructive"
                          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2"
                        >
                          {wishlist.length}
                        </Badge>
                        <Heart className="size-6" />
                      </Link>

                      <Link href="/cart" className="font-medium relative">
                        <Badge
                          variant="destructive"
                          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2"
                        >
                          {totalItemsInCart}
                        </Badge>
                        <ShoppingCart className="size-6" />
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/signin" })}
                          >
                            Sign Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
