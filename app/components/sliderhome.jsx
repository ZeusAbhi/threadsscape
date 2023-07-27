import React from 'react'
 // Import Swiper React components
 import { Swiper, SwiperSlide } from "swiper/react";

 // Import Swiper styles
 import "swiper/css";
 import 'swiper/css/pagination';
 import "swiper/css/navigation";
 import "swiper/css/autoplay";

 
 // import required modules
 import { Navigation, Pagination,Autoplay } from "swiper";

const Sliderhome = () => {
  return (
      <div className='w-[32vw] h-[50vh]'>
    <Swiper  pagination={true} modules={[Navigation,Pagination,Autoplay]}     slidesPerView={1} autoplay={{delay:3000,pauseOnMouseEnter :true,disableOnInteraction: false}} speed={800} loop={true} className="mySwiper" >
        <SwiperSlide>
        <div className=' w-[32vw] h-[50vh] border-2 border-white bg-cover bg-no-repeat  bg-center' style={{ "backgroundImage": "url('sup.jpg')" }} ></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className=' w-[32vw] h-[50vh] border-2 border-white bg-cover bg-center' style={{ "backgroundImage": "url('pepe.avif')" }} ></div>
        </SwiperSlide>
        <SwiperSlide>
        <div className=' w-[32vw] h-[50vh] border-2 border-white bg-contain bg-no-repeat bg-center' style={{ "backgroundImage": "url('van.png')" }} ></div> 
        </SwiperSlide>
        </Swiper>
        </div>
    
  )
}

export default Sliderhome