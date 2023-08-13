"use client";
import React, { useEffect } from "react";
import Sliderhome from "./sliderhome";
import { useInView } from "react-intersection-observer";
import "./homepage.css";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const Homepage = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      scroller: window,
    });

    gsap.to(".text p", {
      backgroundPositionX: "0%",
      stagger: 1,
      scrollTrigger: {
        trigger: ".pinme",
        scrub: true,
        start: "top 0px",
        pin: ".pinme",
        pinSpacing: true,
      },
    });
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <a
          className="  text-md absolute flex h-16 w-16 cursor-default items-center justify-center rounded-full bg-white text-white"
          href="/shop"
        >
          <button className="  text-md xl: absolute z-10 flex  h-14 w-14 cursor-pointer items-center justify-center  rounded-full bg-black text-white">
            <MoveRight size={30} />
          </button>
        </a>
        <div className=" flex flex-grow  justify-center xl:flex xl:flex-col  ">
          <div className=" flex h-[50vh] w-[32vw] flex-col justify-center break-normal border-2 border-white xl:h-[70vh] xl:w-[100vw]">
            <h1 className="flex flex-col  text-[3.5rem] font-medium leading-tight   tracking-tighter text-black  xl:text-center  ">
              <span>Dress Up &</span>
              <span>Stand Out:</span>
              <span>be Bold</span>
            </h1>
            <p className="xl:px-2 xl:text-center">
              if you're looking for the latest and greatest in streetwear and
              fashion trends,you've come to the right place.
            </p>
          </div>
          <div
            className=" h-[50vh] w-[33vw] border-2 border-white bg-cover bg-center xl:h-[70vh] xl:w-[100vw] xl:bg-cover xl:bg-top "
            style={{ backgroundImage: "url('f3.jpg')" }}
          ></div>
          <Sliderhome />
        </div>
        <div className=" my-0 flex flex-grow justify-center xl:flex xl:flex-col">
          <div className="flex h-[50vh] w-[33vw] flex-col justify-center break-normal bg-black text-white xl:h-[70vh]   xl:w-[100vw]">
            <p className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-center text-transparent">
              {" "}
              <span className="text-[4rem]">
                <span className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-transparent">
                  Special Offer
                </span>
              </span>
              <span className="flex justify-center xl:px-3">
                Sign up now and recieve 25% off your first order.It's the
                perfect oppurtunity to grab that streetwear piece you've been
                eyeing.
              </span>
            </p>
          </div>
          <div className="flex h-[50vh] w-[33vw] flex-col justify-center gap-8 break-normal bg-white text-center text-xl font-medium text-black xl:h-[70vh] xl:w-[100vw]">
            <span className="text-[3rem]">New Collection</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, suscipit.
            </p>
          </div>
          <div
            className="flex h-[50vh] w-[33vw] flex-col justify-center bg-black bg-cover bg-center bg-no-repeat  text-center text-white xl:h-[70vh] xl:w-[100vw]"
            style={{ backgroundImage: "url('calvin.jpg')" }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col   items-center justify-center">
        <div className="pinme container bg-pink-100">
          <div className="text flex flex-col gap-6 text-[8rem] xl:text-[7rem] md:text-[5rem] sm:gap-[3rem] sm:text-[4rem]">
            <p id="target " style={{ opacity: 1 }}>
              Blazing
            </p>
            <p id="target " style={{ opacity: 1 }}>
              Fast
            </p>
            <p id="target " style={{ opacity: 1 }}>
              Deliveries
            </p>
          </div>
        </div>

        <div
          ref={ref}
          className={`transform text-center  transition-all duration-500 ease-in-out ${
            inView ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ maxWidth: "100%", transitionProperty: "transform" }}
        >
          <img
            src="./shpg2.png"
            className="  relative w-[99vw] bg-cover bg-center"
            alt=""
          />
          <div className=" absolute top-[30%]  mx-2  flex flex-col  text-black">
            <span className=" text-9xl xl:text-8xl md:text-5xl">Shop</span>
            <span className=" text-8xl xl:text-7xl md:text-4xl">Latest</span>
            <span className=" text-8xl xl:text-6xl md:text-3xl">Styles</span>
            <div className="group">
              <a className="relative inline-block my-2" href="/shop">
                Explore our Products
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-white text-xl transition-transform duration-300  ease-in-out group-hover:scale-x-100"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
