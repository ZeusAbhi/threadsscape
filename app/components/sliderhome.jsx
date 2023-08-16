
import React from "react";
import Link from "next/link"; // Import Link from Next.js
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper";

const Sliderhome = () => {
  return (
    <div className="xl:h-[70vh] xl:w-[100vw] h-[50vh] w-[32vw]">
      <Swiper
        pagination={true}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={true}
        className="mySwiper"
      >
         <SwiperSlide>
          <Link href="https://threadsscape.vercel.app/shop/prod_01H7TRQYE8H0CET81QQAWP6DRV">
            <div
              className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('medusa_1.png')" }}
            ></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://threadsscape.vercel.app/shop/prod_01H7TRRGD7NFCW9M2NEEYX7DZV">
            <div
              className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('medusa_2.png')" }}
            ></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://threadsscape.vercel.app/shop/prod_01H7TRPY7ZCN975RDKW6FSVRD2">
            <div
              className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('medusa_3.png')" }}
            ></div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sliderhome;

