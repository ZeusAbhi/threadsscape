"use client";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { useSelector } from "react-redux";
import { SearchCheck, ShoppingCart } from "lucide-react";
import { medusaClient } from "../utils/client";
import * as Separator from "@radix-ui/react-separator";
import "./nav.css";
import Search from "./search";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(localStorage.getItem("cartCount") || 0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const handleLogout = () => {
    localStorage.removeItem("User");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      const results = await medusaClient.products.list();
      const updatedProducts = results.products.map((e) => ({
        title: e.title,
        thumbnail: e.thumbnail,
        id: e.id,
      }));
      setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
    };

    getProducts();
  }, []);
  //Debouncing
  useEffect(() => {
    if (products.length > 0) {
      if (search.length > 0) {
        const timeoutId = setTimeout(() => {
          const searchProducts = () => {
            const results = products.filter((product) =>
              product.title.toLowerCase().includes(search.toLowerCase())
            );
            setResults(results);
          };
          searchProducts();
        }, 1000);
        return () => clearTimeout(timeoutId);
      } else setResults([]);
    }
  }, [search, products]);
  useEffect(() => {
    console.log(results);
  }, [results]);

  useEffect(() => {
    const updateCount = async () => {
      // Check if the 'cart' is a promise and wait for it to resolve.
      if (cart instanceof Promise) {
        try {
          const resolvedCart = await cart; // Wait for the promise to resolve.
          if (resolvedCart.items != null) {
            setCount(resolvedCart.items.length);
            localStorage.setItem("cartCount", resolvedCart.items.length);
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
          localStorage.setItem("cartCount", cart.items.length);
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
    <>
    <div className="flex h-[10vh] w-[100vw] justify-center bg-white">
      <div className="flex items-center justify-center gap-12 text-lg text-black">
        <div className="absolute  left-0 flex items-center  gap-10">
          <h1 className="  flex items-center justify-center text-2xl font-bold">
            <img src="./thread.png" className="   h-16 w-20" alt="" />
            ThreadScape
          </h1>

          <Link href="/home" className="text-sm">
            Home
          </Link>
          <Link href="/shop" className="text-sm">
            Shop
          </Link>
        </div>
        <div className="flex flex-col">
          <Popover.Root>
            <div className="relative flex items-center justify-center">
              <input
                className="h-7 w-[30vw] rounded-md shadow-md  text-center text-sm text-black outline-none"
                type="text"
                name=""
                id=""
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Popover.Trigger asChild>
                <SearchCheck
                  color="black"
                  size={20}
                  className="absolute right-2 cursor-pointer"
                />
              </Popover.Trigger>
            </div>
            <Popover.Portal>
              <Popover.Content
                className="z-10 my-4  min-h-max    w-[400px]  gap-5 overflow-y-auto rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.white)] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                sideOffset={5}
              >
                {results.length > 0 ? (
                  <Search results={results} />
                ) : (
                  <p>No Results found</p>
                )}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div className="absolute right-[3vw] flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <p className=" flex cursor-pointer items-center text-sm text-white">
                    <ShoppingCart color="black" />{" "}
                    <span className="px-1 text-[0.65rem]">({count})</span>
                  </p>
                </Popover.Trigger>
                <Popover.Portal>
                  {count > 0 ? (
                    <Popover.Content
                      className="  example z-10 my-4 h-[500px] w-[400px]  overflow-y-scroll  rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.white)] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                      sideOffset={5}
                    >
                      <Cart />
                    </Popover.Content>
                  ) : (
                    <Popover.Content
                      className=" z-10 my-4 flex h-[200px] w-[400px] flex-col items-center justify-center  gap-5 overflow-y-auto rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.white)] focus:outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                      sideOffset={5}
                    >
                      <button className="text-md h-10  w-10 cursor-default rounded-full bg-black text-white">
                        {count}
                      </button>
                      <p className="text-[0.7rem]">
                        Your Shopping bag is empty.
                      </p>
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
            <button className="  h-8 w-20 rounded-md bg-blue-500 transition-all hover:bg-slate-200">
              <Link href="/signup">
                <p className="text-sm  text-white">Signup</p>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
      <Separator.Root
                className="   bg-slate-100 h-1 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-[100vw] data-[orientation=vertical]:w-5px"
                decorative
                orientation="horizontal"
              />
    </>
  );
};

export default Navbar;
