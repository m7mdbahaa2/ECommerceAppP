"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { ICategory } from "@/interface/categories.interface";

export default function CategoriesSwiper({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="container mx-auto my-8">
      <Swiper className="mySwiper"
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !size-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-red-500 !border-1 !border-red-500 !border-white",
        }}
        modules={[Pagination]}
      >
        {categories.map((categorie) => (
          <SwiperSlide key={categorie._id} className="mb-8">
            <Image
              src={categorie.image}
              alt={categorie.name}
              width={270}
              height={250}
              className="w-full object-contain h-[15.625rem] bg-gray-100 mb-4"
              loading="lazy"
            />
            <h3 className="font-medium">{categorie.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
