"use client";
import React from "react";
import Sliderhome from "./sliderhome";
const Homepage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className=" flex flex-grow  justify-center ">
          <div className=" flex h-[50vh] w-[32vw] flex-col justify-center break-normal border-2 border-white text-center">
            <h1 className="text-[3.5rem] font-bold text-black ">
              Lorem, ipsum.
            </h1>
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam,
              tempore asperiores labore nemo ipsum fugiat ea aliquam error vel
              explicabo.
            </p>
          </div>
          <div
            className=" h-[50vh] w-[32vw] border-2 border-white bg-cover bg-center "
            style={{ "backgroundImage": "url('fashion1.jpg')" }}
          ></div>
          <Sliderhome />
        </div>
        <div className=" my-0 flex  flex-grow justify-center">
          <div className="flex h-[35vh] w-[32vw] flex-col justify-center break-normal bg-black text-center text-xl text-white">
            <p className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-transparent">
              {" "}
              <span className="text-[5rem]">
                <span className="bg-gradient-to-r from-purple-500 to-blue-300 bg-clip-text text-transparent">
                  20%
                </span>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex h-[35vh] w-[32vw] flex-col justify-center gap-8 break-normal bg-white text-center text-xl text-black">
            <span className="text-[3rem]">New Collection</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, suscipit.
            </p>
          </div>
          <div
            className="flex h-[35vh] w-[32vw] flex-col justify-center bg-black bg-center text-center text-white"
            style={{ "backgroundImage": "url('uspolo.png')" }}
          >
            <p>Shop now</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
