"use client";
import React, { useEffect, useState } from "react";

const ProductCard = ({ title, thumb, price }) => {
  const [FormattedPrice, setFormattedPrice] = useState(0);
  useEffect(() => {
    const convertToINR = async (price) => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        const exchangeRate = data.rates.INR;
        const priceInINR = price * exchangeRate;
        const formattedPrice = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(priceInINR / 100);
        setFormattedPrice(formattedPrice);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    convertToINR(price);
  }, []);

  return (
    <>
      <div className="flex h-[45vh]  w-[20vw] flex-grow flex-col gap-5 rounded-[0.7rem] border-[1px] border-gray-200 bg-white shadow-md">
        <div
          className=" h-[30vh] rounded-[0.5rem] bg-gray-200      bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: thumb && thumb.includes('localhost') ? "url('https://threadsscape.vercel.app/white2.avif')" : `url(${thumb})`
          }}
        ></div>
        <h1 className="mx-2 text-lg  ">{title}</h1>
        <h1 className="mx-2 text-lg  font-semibold">{FormattedPrice}</h1>
      </div>
    </>
  );
};

export default ProductCard;
