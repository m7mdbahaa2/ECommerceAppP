import CategoriesSection from "@/components/home/CategoriesSection";
import MainSwiper from "@/components/home/MainSwiper";
import ProductSection from "@/components/home/ProductSection";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import Navbar from "@/components/ui/layout/Navbar";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <MainSwiper />
      <Suspense fallback={<SkeletonLoader />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <ProductSection />
      </Suspense>
    </div>
  );
}
