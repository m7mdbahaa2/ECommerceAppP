// "use client"
import { IProduct } from "@/interface/products.interface";
import { getProductDetails } from "@/services/getProductDetails.service";
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductSlider from "./ProductSlider";
import AddToCartbtn from "@/components/AddToCartbtn";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  // console.log(productId);

  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );

  console.log(product);

  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-17">
          <div className="lg: col-span-2">
            {/* <img
            src={product.imageCover}
            alt={product.title}
            className="rounded-lg mx-auto"
            height={500}
            width={500}
          /> */}

            <ProductSlider images={product.images} />
          </div>
          <div className="col-span-1">
            <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
            <div className="flex items-center gap-1">
              <span className="text-small font-semibold text-gray-500 mb-4">
                {product.ratingsAverage}
              </span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {/* <span>{product.ratingsQuantity}</span> */}
            </div>
            <span className=" text-2xl mb-6 block">${product.price}</span>
            <p className="text-gray-600 mb-4 text-sm border-b border-b-gray-400 pb-6">
              {product.description}
            </p>

            <AddToCartbtn productId={product._id} />

            {/* <Button className="w-full" variant={"destructive"}>
              Add to cart
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
