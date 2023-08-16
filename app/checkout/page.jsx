"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./checkout.css";
import { useSelector } from "react-redux";
import { medusaClient } from "../utils/client";
import * as Separator from "@radix-ui/react-separator";
import * as RadioGroup from "@radix-ui/react-radio-group";
import axios from "axios";

const Checkout = () => {
  const { Cart } = useSelector((state) => state.cart);
  const [details, setDetails] = useState([]);
  const [cart, setCart] = useState({});
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isRadioButtonClicked, setIsRadioButtonClicked] = useState(false);
  useEffect(() => {
    if (typeof Storage == "undefined") return;
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
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/savedetails`, {
        email: data.email,
        phone: data.phone,
        address: data.address,
      })
      .then((res) => setDetails(res.data))
      .catch((e) => console.log("error", e));
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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/create-checkout-session`, {
        cart,
        exchangeRate,
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
      <div className="flex min-h-screen justify-center  bg-[#F9FAFB] ">
        <div className="xl:flex-col  flex  gap-10">
          <div className="my-5 flex xl:w-[80vw] h-[78vh] w-[55vw] flex-col items-center gap-5 rounded-md bg-white">
            <h3 className="my-2 text-lg">Shipping Address</h3>
            <form
              className="flex flex-col  gap-8 text-sm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <input
                  className="  small-placeholder h-[5vh] xl:w-[70vw]    w-[50vw] border-2 border-[#e5e7eb] outline-none"
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
                    {errors.email.type === "minLength"
                      ? "Please Enter a valid email"
                      : errors.email.type === "required"
                      ? "This field is required"
                      : "Spaces are not allowed"}
                  </p>
                )}
              </div>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder xl:w-[35vw] h-[5vh] w-[26vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="First name"
                    {...register("firstname", {
                      required: true,
                      pattern: {
                        value: /^(?!\s)(?!.*\s$)[^\s]+$/, // Prevent spaces at the beginning and end
                        message:
                          "Spaces are not allowed at the beginning or end.",
                      },
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.firstname && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      {errors.firstname.type === "minLength"
                        ? "Your First Name is less than 3 characters"
                        : errors.firstname.type === "required"
                        ? "This field is required"
                        : "Spaces are not allowed"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder xl:w-[33vw] h-[5vh] w-[23vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="Last name"
                    {...register("lastname", {
                      required: true,
                      pattern: {
                        value: /^(?!\s)(?!.*\s$)[^\s]+$/, // Prevent spaces at the beginning and end
                        message:
                          "Spaces are not allowed at the beginning or end.",
                      },
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.lastname && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      {errors.lastname.type === "minLength"
                        ? "Your Last Name is less than 3 characters"
                        : errors.lastname.type === "required"
                        ? "This field is required"
                        : "Spaces are not allowed"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <textarea
                  className="small-placeholder xl:w-[70vw] h-[10vh] w-[50vw] resize-none border-2 border-gray-200 outline-none"
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
                    {errors.address.type === "minLength"
                      ? "Your Address is less than 3 characters"
                      : errors.address.type === "required"
                      ? "This field is required"
                      : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder xl:w-[34vw] h-[5vh] w-[26vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="City"
                    {...register("city", {
                      required: true,
                      pattern: {
                        value: /^(?!\s)(?!.*\s$)[^\s]+$/, // Prevent spaces at the beginning and end
                        message:
                          "Spaces are not allowed at the beginning or end.",
                      },
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.city && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      {errors.city.type === "minLength"
                        ? "Your city is less than 3 characters"
                        : errors.city.type === "required"
                        ? "This field is required"
                        : "Spaces are not allowed"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    className="small-placeholder xl:w-[35vw] h-[5vh] w-[23vw] border-2 border-gray-200 outline-none"
                    type="text"
                    placeholder="State"
                    {...register("state", {
                      required: true,
                      pattern: {
                        value: /^(?!\s)(?!.*\s$)[^\s]+$/, // Prevent spaces at the beginning and end
                        message:
                          "Spaces are not allowed at the beginning or end.",
                      },
                      minLength: 3,
                      maxLength: 15,
                    })}
                  />
                  {errors.state && (
                    <p className=" -my-3 text-[0.6rem] text-red-500">
                      {errors.state.type === "minLength"
                        ? "Your state is less than 3 characters"
                        : errors.state.type === "required"
                        ? "This field is required"
                        : "Spaces are not allowed"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <input
                  className="small-placeholder xl:w-[70vw] h-[5vh] w-[50vw] border-2 border-gray-200 outline-none"
                  type="number"
                  placeholder="Phone"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^(?!\s)(?!.*\s$)[^\s]+$/, // Prevent spaces at the beginning and end
                      message:
                        "Spaces are not allowed at the beginning or end.",
                    },
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {errors.phone && (
                  <p className=" -my-5 text-[0.6rem] text-red-500">
                    {errors.phone.type === "minLength" ||
                    errors.phone.type === "maxLength"
                      ? "Your Phone should be 10 digits"
                      : errors.phone.type === "required"
                      ? "This field is required"
                      : "Spaces are not allowed"}
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
          <div className="flex flex-col ">
            <div className=" my-5 h-[35vh] xl:w-[80vw] w-[28vw] overflow-y-auto rounded-md bg-white">
              <h1 className=" py-3 text-center text-xl">Saved Address</h1>
              <div className="my-5 flex md:w-[60vw] xl:w-[40vw] w-[15vw] flex-col  gap-1">
                <RadioGroup.Root
                  className="flex flex-col gap-2.5"
                  onValueChange={() => setIsRadioButtonClicked(true)}
                  aria-label="View density"
                >
                  {details.length > 0 &&
                    details.map((e, index) => {
                      return (
                        <div className="mx-4 flex gap-3 w-max " id={index}>
                          <RadioGroup.Item
                            className="h-[25px] w-[25px] cursor-default rounded-full bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                            value={index}
                            name="sdfs"
                          >
                            <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:bg-violet11 after:content-['']" />
                          </RadioGroup.Item>
                          <div className="flex flex-col gap-2">
                            <p className="text-lg">{e.email}</p>
                            <p className="text-md">{e.phone}</p>
                            <p className="text-sm">{e.address}</p>
                          </div>
                        </div>
                      );
                    })}
                </RadioGroup.Root>
              </div>
            </div>
            <div className="my-5 flex h-[40vh]  xl:w-[80vw] xl:justify-center w-[28vw]  gap-[10vw]  rounded-md bg-white px-5 py-5">
              <div className="flex xl:w-[45vw] w-[10vw] flex-col gap-5">
                <h1>Subtotal</h1>
                <h4>Shipping</h4>
                <h4>Taxes</h4>
                <Separator.Root
                  className=" bg-black data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:xl:w-[70vw] w-[25vw] data-[orientation=vertical]:w-px"
                  decorative
                  orientation="horizontal"
                />
                <h3>Total</h3>

                <button
                  onClick={handlePayment}
                  disabled={!isRadioButtonClicked} // Disable the button when isRadioButtonClicked is false
                  className={`flex h-10  w-[25vw] items-center justify-center border-[1.5px] ${
                    isRadioButtonClicked
                      ? "border-black bg-black text-white"
                      : "border-gray-100 cursor-not-allowed bg-gray-200 text-black"
                  } text-sm outline-none transition-all hover:bg-white hover:text-black ${
                    isRadioButtonClicked
                      ? "hover:border-black hover:text-black"
                      : "hover:border-gray-500 hover:bg-gray-400"
                  }`}
                >
                  Checkout
                </button>
              </div>
              <div className="flex xl:w-[20vw] w-[10vw]  flex-col gap-5">
                <h1>
                  ₹{(parseFloat(cart.subtotal / 100) * exchangeRate).toFixed(2)}
                </h1>
                <h4>₹0.00</h4>
                <h4>₹0.00</h4>
                <h1 style={{ paddingTop: "19px" }}>
                  ₹{(parseFloat(cart.subtotal / 100) * exchangeRate).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
