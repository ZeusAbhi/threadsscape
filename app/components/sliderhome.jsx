import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";

const Sliderhome = () => {
  return (
    <div className="h-[50vh] w-[32vw]">
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
          <a
            href="/shop/prod_01H40HGA5P9X6HRQEESBC662KY"
            className="block h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('medusa_1.png')" }}
          ></a>
        </SwiperSlide>
        <SwiperSlide>
          <a
            href="/shop/prod_01H40HGA5P9X6HRQEESBC662KY"
            className="block h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('medusa_2.png')" }}
          ></a>
        </SwiperSlide>
        <SwiperSlide>
          <a
            href="/shop/prod_01H40HGA5P9X6HRQEESBC662KY"
            className="block h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('medusa_3.png')" }}
          ></a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sliderhome;
