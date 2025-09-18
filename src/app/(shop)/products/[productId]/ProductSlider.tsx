"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination } from "swiper/modules";

export default function ProductSlider({ images }: { images: string[] }) {
  return (
    <div>
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
                src={image}
                alt={`product`}
                width={500}
                height={500}
                className="w-full object-contain h-[37.5rem] mx-auto rounded-lg"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
  );
}
