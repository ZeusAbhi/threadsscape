// import React from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import "./swiper.css";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";

// // import required modules
// import { Navigation, Pagination, Autoplay } from "swiper";

// const Sliderhome = () => {
//   return (
//     <div className=" xl:h-[70vh] xl:w-[100vw] h-[50vh] w-[32vw]">
//       <Swiper
//         pagination={true}
//         modules={[Navigation, Pagination, Autoplay]}
//         slidesPerView={1}
//         autoplay={{
//           delay: 3000,
//           pauseOnMouseEnter: true,
//           disableOnInteraction: false,
//         }}
//         speed={800}
//         loop={true}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <a
//             href="https://threadsscape.vercel.app/shop/prod_01H40HGA9DRVTRGMWVF1PJQ2TE"
//             className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('medusa_1.png')" }}
//           ></a>
//         </SwiperSlide>
//         <SwiperSlide>
//           <a
//             href="https://threadsscape.vercel.app/shop/prod_01H40HG9ZMR7E9NCXJBDV3QY2E"
//             className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('medusa_2.png')" }}
//           ></a>
//         </SwiperSlide>
//         <SwiperSlide>
//           <a
//             href="https://threadsscape.vercel.app/shop/prod_01H40HGA5P9X6HRQEESBC662KY"
//             className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('medusa_3.png')" }}
//           ></a>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default Sliderhome;
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
          <Link href="https://threadsscape.vercel.app/shop/prod_01H40HGA9DRVTRGMWVF1PJQ2TE">
            <div
              className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('medusa_1.png')" }}
            ></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://threadsscape.vercel.app/shop/prod_01H40HG9ZMR7E9NCXJBDV3QY2E">
            <div
              className="block xl:h-[70vh] xl:w-[100vw] xl:bg-contain h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('medusa_2.png')" }}
            ></div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="https://threadsscape.vercel.app/shop/prod_01H40HGA5P9X6HRQEESBC662KY">
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

