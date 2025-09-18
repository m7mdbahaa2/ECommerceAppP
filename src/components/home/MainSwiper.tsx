"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import image1 from "@/assets/images/banner-1.jpeg";
import image2 from "@/assets/images/banner-2.jpeg";
import image3 from "@/assets/images/banner-3.jpeg";
import Image from "next/image";

const images = [
  {
    path: image1.src,
    label: "image 1",
  },
  {
    path: image2.src,
    label: "image 2",
  },
  {
    path: image3.src,
    label: "image 3",
  },
];

export default function MainSwiper() {
  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
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
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={image.path}
                alt={image.label}
                width={1920}
                height={1080}
                className="w-full object-cover h-[21.5rem]"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
