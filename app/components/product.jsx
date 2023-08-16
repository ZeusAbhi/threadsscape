"use-client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
const Product = ({ title, thumb, desc, weight, price, variants }) => {
  const [FormattedPrice, setFormattedPrice] = useState(0);
  const [focus, setFocus] = useState("");
  const [variantID, setVariantID] = useState("");
  const dispatch = useDispatch();

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
  }, [price]);

  return (
    <div className=" xl:flex-col xl:items-center xl:justify-center flex justify-center gap-10  ">
      <div
        className=" xl:w-[100vw] h-[90vh] w-[40vw]  bg-gray-200 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: thumb && thumb.includes('localhost') ? `url(./white.png)` : `url(${thumb})`
        }}
      ></div>
      <div className=" xl:w-[90vw] my-4 flex  w-[40vw] flex-col gap-4">
        <h1 className="text-2xl text-black">{title}</h1>
        <h5 className="text-sm text-black">{desc}</h5>
        <h6 className="text-sm text-black ">
          Weight:<span className="mx-2">{weight}g</span>
        </h6>
        <p className="my-6 text-sm font-bold">Select Size</p>
        <div className="flex gap-6">
          <button
            className={
              focus !== "S"
                ? "h-10 w-10 border-[1px] border-gray-200 text-[0.6rem] hover:border-black"
                : "h-10 w-10 border-[1px] border-black text-[0.6rem]"
            }
            onClick={() => {
              setFocus("S");
              setVariantID(variants[0].id);
            }}
          >
            S
          </button>

          <button
            className={
              focus !== "M"
                ? "h-10 w-10 border-[1px] border-gray-200 text-[0.6rem] hover:border-black "
                : "h-10 w-10 border-[1px] border-black text-[0.6rem]"
            }
            onClick={() => {
              setFocus("M");
              setVariantID(variants[1].id);
            }}
          >
            M
          </button>
          <button
            className={
              focus !== "L"
                ? "h-10 w-10 border-[1px] border-gray-200 text-[0.6rem] hover:border-black "
                : "h-10 w-10 border-[1px] border-black text-[0.6rem]"
            }
            onClick={() => {
              setFocus("L");
              setVariantID(variants[2].id);
            }}
          >
            L
          </button>
          <button
            className={
              focus !== "XL"
                ? "h-10 w-10 border-[1px] border-gray-200 text-[0.6rem] hover:border-black"
                : "h-10 w-10 border-[1px] border-black text-[0.6rem]"
            }
            onClick={() => {
              setFocus("XL");
              setVariantID(variants[3].id);
            }}
          >
            XL
          </button>
        </div>

        <h6 className="my-5 font-bold">{FormattedPrice}</h6>
        <button
          className=" w-23 h-10 border-2 border-black bg-black text-sm text-white transition-all hover:bg-white hover:text-black"
          onClick={() =>{

             if(localStorage.getItem("User")==null)
                window.location.href='/login'
              else
                dispatch(addToCart(variantID))
          } }
        >
          Add to Cart
        </button>

        <div className=" flex flex-col flex-wrap gap-10">
          <div className="flex gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.63462 7.35205H2.70508"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M4.56416 4.56348H2.70508"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16.6483 19.4365H3.63477"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16.9034 4.56348L15.9868 7.61888C15.8688 8.01207 15.5063 8.28164 15.0963 8.28164H12.2036C11.5808 8.28164 11.1346 7.68115 11.3131 7.08532L12.0697 4.56348"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M8.28125 12.9297H10.2612"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17.055 15.718H7.21305C5.71835 15.718 4.64659 14.2772 5.07603 12.8457L7.08384 6.15299C7.36735 5.20951 8.23554 4.56348 9.22086 4.56348H19.0638C20.5585 4.56348 21.6302 6.00426 21.2008 7.43576L19.193 14.1284C18.9095 15.0719 18.0403 15.718 17.055 15.718Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <p className="text-[0.7rem] text-black">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
          <div className="flex gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8007 3.33301V8.53308H14.6006"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M4.2002 12C4.20157 10.4949 4.63839 9.02228 5.45797 7.75984C6.27755 6.4974 7.44488 5.49905 8.81917 4.8852C10.1935 4.27135 11.716 4.06823 13.2031 4.30034C14.6903 4.53244 16.0785 5.18986 17.2004 6.19329L19.8004 8.53332"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M4.2002 20.6669V15.4668H9.40027"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19.8004 12C19.799 13.5051 19.3622 14.9778 18.5426 16.2402C17.7231 17.5026 16.5557 18.501 15.1814 19.1148C13.8072 19.7287 12.2846 19.9318 10.7975 19.6997C9.31033 19.4676 7.9221 18.8102 6.80023 17.8067L4.2002 15.4667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>

            <p className="text-[0.7rem] text-black">
              Is the fit not quite right? No worries - we'll exchange your
              product for a new one.
            </p>
          </div>
          <div className="flex gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 3.5V9.5H10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M4.09714 14.014C4.28641 15.7971 4.97372 16.7931 6.22746 18.0783C7.4812 19.3635 9.13155 20.1915 10.9137 20.4293C12.6958 20.6671 14.5064 20.301 16.0549 19.3898C17.6033 18.4785 18.8 17.0749 19.4527 15.4042C20.1054 13.7335 20.1764 11.8926 19.6543 10.1769C19.1322 8.46112 18.0472 6.97003 16.5735 5.94286C15.0997 4.91569 13.3227 4.412 11.5275 4.51261C9.73236 4.61323 8.02312 5.31232 6.6741 6.4977L4 8.89769"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <p className="text-[0.7rem] text-black">
              Just return your product and we'll refund your money. No questions
              asked – we'll do our best to make sure your return is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
