"use client";

import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/interface/categories.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props {
  categories: ICategory[];
}

export default function CategoriesSwiper({ categories }: Props) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <Link
            href={`/categories/${category._id}`}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={120}
              height={100}
              className="object-cover rounded"
            />
            <span className="text-sm font-medium text-center">
              {category.name}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
