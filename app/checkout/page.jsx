"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./checkout.css";
import { useSelector } from "react-redux";
import { medusaClient } from "../utils/client";
import * as Separator from "@radix-ui/react-separator";
import axios from "axios";

const Checkout = () => {
  const { Cart } = useSelector((state) => state.cart);
  const [cart, setCart] = useState({});
  const [exchangeRate, setExchangeRate] = useState(0);
  useEffect(() => {
    const getCart = async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user !== null) {
        const userID = user.id;
        const cartobject = JSON.parse(localStorage.getItem(userID));
        const cartID = cartobject !== null ? cartobject.cartID : null;
        if (cartID != null) {
          await medusaClient.carts
            .retrieve(cartID)
            .then(({ cart }) => setCart(cart));
        }
      }
    };
    getCart();
  }, [Cart, []]);

  useEffect(() => {
    const convertToINR = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRate(data.rates.INR);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    convertToINR();
  }, [cart]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePayment = () => {
    const item =
      cart?.items?.map((e) => ({
        id: e.variant_id,
        quantity: e.quantity,
      })) || [];
      const user = JSON.parse(localStorage.getItem("User"));
        const userID = user.id;
        const cartobject = JSON.parse(localStorage.getItem(userID));
        const cartID = cartobject !== null ? cartobject.cartID : null;
      
    axios
      .post("http://localhost:5000/create-checkout-session", {
        cart,
        exchangeRate
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          return Promise.reject(res.data);
        }
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex h-[100vh] justify-center  bg-[#F9FAFB] ">
        <div className="flex gap-10">
          <div className="my-5 flex h-[76vh] w-[55vw] flex-col items-center gap-4  rounded-md bg-white">
            <h3 className="my-2 text-lg">Shipping Address</h3>
            <form
              className="flex flex-col  gap-8 text-sm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <input
                  className="  small-placeholder h-[5vh]    w-[50vw] border-2 border-[#e5e7eb] outline-none"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <p className=" -my-3 text-[0.6rem] text-red-500">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder h-[5vh] w-[26vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="First name"
                    {...register("firstname", {
                      required: true,
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.firstname && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      Your First Name is less than 3 characters
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder h-[5vh] w-[23vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="Last name"
                    {...register("lastname", {
                      required: true,
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.lastname && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      Your Last Name is less than 3 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <textarea
                  className="small-placeholder h-[10vh] w-[50vw] resize-none border-2 border-gray-200 outline-none"
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: true,
                    minLength: 3,
                    maxLength: 80,
                  })}
                />
                {errors.address && (
                  <p className=" -my-3 text-[0.6rem] text-red-500">
                    Your Address is less than 3 characters
                  </p>
                )}
              </div>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder h-[5vh] w-[26vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: true,
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.city && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      Your City is less than 3 characters
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder h-[5vh] w-[23vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="State"
                    {...register("state", {
                      required: true,
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.state && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      Your State is less than 3 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <input
                  className="small-placeholder h-[5vh] w-[50vw] border-2 border-gray-200 outline-none"
                  type="number"
                  placeholder="Phone"
                  {...register("phone", {
                    required: true,
                    Length: 10,
                  })}
                />
                {errors.phone && (
                  <p className=" -my-5 text-[0.6rem] text-red-500">
                    Your Phone number should be 10 digits
                  </p>
                )}
              </div>
              <input
                className="  flex h-10 w-36 items-center   justify-center border-[1.5px] border-black bg-black text-sm text-white outline-none transition-all hover:bg-white hover:text-black"
                type="submit"
                value="Save"
                {...register("submit")}
              />
            </form>
          </div>
          <div className="my-5 flex h-[40vh]  w-[28vw]  gap-[10vw]  rounded-md bg-white px-5 py-5">
            <div className="flex w-[10vw] flex-col gap-5">
              <h1>Subtotal</h1>
              <h4>Shipping</h4>
              <h4>Taxes</h4>
              <Separator.Root
                className="mx-[8px] bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-[25vw] data-[orientation=vertical]:w-px"
                decorative
                orientation="horizontal"
              />
              <h3>Total</h3>
              <button
                onClick={handlePayment}
                className="  flex h-10 w-[25vw] items-center   justify-center border-[1.5px] border-black bg-black text-sm text-white outline-none transition-all hover:bg-white hover:text-black"
              >
                Checkout
              </button>
            </div>
            <div className="flex w-[10vw] flex-col gap-5">
              <h1>
                ₹{(parseFloat(cart.subtotal / 100) * exchangeRate).toFixed(2)}
              </h1>
              <h4>₹0.00</h4>
              <h4>₹0.00</h4>
              <h1 style={{ paddingTop: "19px" }}>
                ₹
                {(parseFloat(cart.subtotal / 100) * exchangeRate ).toFixed(
                  2
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
