"use client";
import React from "react";
import Sliderhome from "./sliderhome";
import { MoveRight } from "lucide-react";
const Homepage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <a
          className="  text-md absolute flex h-16 w-16 cursor-default items-center justify-center rounded-full bg-white text-white"
          href="/shop"
        >
          <button className="  text-md absolute flex  h-14 w-14 cursor-pointer items-center justify-center  rounded-full bg-black text-white">
            <MoveRight size={30} />
          </button>
        </a>
        <div className=" flex flex-grow  justify-center ">
          <div className=" flex h-[50vh] w-[32vw] flex-col justify-center break-normal border-2 border-white">
            <h1 className="flex  flex-col text-[3.5rem] font-medium   leading-tight tracking-tighter  text-black  ">
              <span>Dress Up &</span>
              <span>Stand Out:</span>
              <span>be Bold</span>
            </h1>
            <p>
              if you're looking for the latest and greatest in streetwear and
              fashion trends,you've come to the right place.
            </p>
          </div>
          <div
            className=" h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center "
            style={{ backgroundImage: "url('f3.jpg')" }}
          ></div>
          <Sliderhome />
        </div>
        <div className=" my-0 flex  flex-grow justify-center">
          <div className="flex h-[50vh] w-[32vw] flex-col justify-center break-normal bg-black   text-white">
            <p className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-center text-transparent">
              {" "}
              <span className="text-[4rem]">
                <span className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-transparent">
                  Special Offer
                </span>
              </span>
              <span className="flex justify-center">
                Sign up now and recieve 25% off your first order.It's the
                perfect oppurtunity to grab that streetwear piece you've been
                eyeing.
              </span>
            </p>
          </div>
          <div className="flex h-[50vh] w-[32vw] flex-col justify-center gap-8 break-normal bg-white text-center text-xl font-medium text-black">
            <span className="text-[3rem]">New Collection</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, suscipit.
            </p>
          </div>
          <div
            className="flex h-[50vh] w-[32vw] flex-col justify-center bg-black bg-cover  bg-center bg-no-repeat text-center text-white"
            style={{ backgroundImage: "url('calvin.jpg')" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
