"use client";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(localStorage.getItem("cartCount") || 0);
  const { cart } = useSelector((state) => state.cart);
  const handleLogout = () => {
    localStorage.removeItem("User");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const updateCount = async () => {
      // Check if the 'cart' is a promise and wait for it to resolve.
      if (cart instanceof Promise) {
        try {
          const resolvedCart = await cart; // Wait for the promise to resolve.
          if (resolvedCart.items != null) {
            setCount(resolvedCart.items.length);
            console.log("cart from redux", resolvedCart.items.length);
          } else {
            console.log(resolvedCart);
          }
        } catch (error) {
          console.error("Error while resolving the cart promise:", error);
        }
      } else {
        // If the 'cart' is not a promise, we can handle it normally.
        if (cart.items != null) {
          setCount(cart.items.length);
          console.log("cart from redux", cart.items.length);
        } else {
          console.log(cart);
        }
      }
    };

    updateCount();
  }, [cart]);
  useEffect(() => {
    const key = "User";
    const userData = localStorage.getItem(key);

    if (userData === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="flex h-[10vh] w-[100vw] justify-center bg-black">
      <div className="flex items-center justify-center gap-12 text-lg text-white">
        <h1 className=" absolute left-[3vw] text-2xl font-bold">ThreadScape</h1>
        <Link href="/home" className="text-sm">
          Home
        </Link>
        <p className="text-sm">Collection</p>
        <Link href="/shop" className="text-sm">
          Shop
        </Link>

        <div className="absolute right-[3vw] flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <p className=" flex cursor-pointer items-center text-sm text-white">
                    <ShoppingCart />{" "}
                    <span className="px-1 text-[0.65rem]">({count})</span>
                  </p>
                </Popover.Trigger>
                <Popover.Portal>
                  {count > 0 ? (
                    <Popover.Content
                      className=" z-10 my-4 h-[500px]  w-[400px] overflow-y-auto rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.white)] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                      sideOffset={5}
                    >
                      <Cart />
                    </Popover.Content>
                  ) : (
                    <Popover.Content
                      className=" z-10 my-4 flex h-[100px] w-[400px] items-center  justify-center overflow-y-auto rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.white)] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                      sideOffset={5}
                    >
                      <a
                        href="/shop"
                        className="  flex h-10 w-36 items-center   justify-center border-[1.5px] border-black bg-black text-sm text-white outline-none transition-all hover:bg-white hover:text-black"
                      >
                        Explore Products
                      </a>
                    </Popover.Content>
                  )}
                </Popover.Portal>
              </Popover.Root>
              <Link href="/Account">
                <p className=" text-sm text-white">Account</p>
              </Link>

              <button
                className=" h-8 w-20 rounded-md bg-red-500 transition-all hover:bg-red-600"
                onClick={handleLogout}
              >
                <p className="text-sm font-bold text-white">Logout</p>
              </button>
            </div>
          ) : (
            <button className="  h-8 w-20 rounded-md bg-white transition-all hover:bg-slate-200">
              <Link href="/signup">
                <p className="text-sm font-bold text-slate-950">Signup</p>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
