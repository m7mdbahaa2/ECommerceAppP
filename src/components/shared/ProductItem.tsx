import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import { IProduct } from "@/interface/products.interface";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.service";
import AddToCartbtn from "../AddToCartbtn";

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <div>
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            className="w-full object-contain h-[15.625rem] bg-gray-100 mb-4 group"
            loading="lazy"
          />
        </Link>
        <AddToCartbtn productId={product._id} />
        {/* <span className="text-xs text-red-600 invisible group-hover:visible">
          add to cart session13-video10
        </span> */}
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
        <div className="flex justify-items-start items-center mt-2">
          <span className="text-red-500 font-medium me-2">
            ${product.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-small font-semibold text-gray-500">
              {product.ratingsAverage}
            </span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {/* <span>{product.ratingsQuantity}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
