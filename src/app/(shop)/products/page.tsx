import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import { getProducts } from "@/services/products.service";
import ProductItem from "@/components/shared/ProductItem";
import { IProduct } from "@/interface/products.interface";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  console.log(products);

  return (
    <section className="py-20 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-15 mb-15">
          {products && products.map((product) => <ProductItem key={product._id} product={product}/>)}
        </div>
      </div>
    </section>
  );
}
