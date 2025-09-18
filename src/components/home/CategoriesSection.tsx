import { ICategory } from "@/interface/categories.interface";
import { getCategories } from "@/services/categories.service";
import React from "react";
import CategoriesSwiper from "./CategoriesSwiper";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "../ui/separator";

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  console.log(categories);
  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <SectionTitle title={"Categories"} subtitle={"Browse By Category"} />
        <CategoriesSwiper categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
