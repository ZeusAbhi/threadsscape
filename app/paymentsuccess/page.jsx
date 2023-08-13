"use client";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { medusaClient } from "../utils/client";
import axios from "axios";
const PaymentSuccess = () => {
  const [cart, setCart] = useState({});
  // useEffect(() => {
  //   if (typeof Storage == "undefined") return;
  //   (async () => {
  //     const user = JSON.parse(localStorage.getItem("User"));
  //     const userID = user.id;
  //     const cartobject = JSON.parse(localStorage.getItem(userID));
  //     const cartID = cartobject !== null ? cartobject.cartID : null;
  //     if (cartID != null) {
  //       await medusaClient.carts
  //         .retrieve(cartID)
  //         .then(({ cart }) => setCart(cart));
  //     }
  //   })();
  // }, []);
  // useEffect(() => {
  //   const update = () => {
  //     axios
  //       .post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/orders`, {
  //         order: cart,
  //       })
  //       .then((res) => console.log(res))
  //       .catch((e) => console.log(e));
  //     const user = JSON.parse(localStorage.getItem("User"));
  //     const userID = user.id;
  //     localStorage.removeItem(userID);
  //     localStorage.removeItem("cartCount");
  //     window.location.href = "/home";
  //   };
  //   if (typeof Storage != undefined) update();
  // }, [cart]);
  useEffect(() => {
    if (typeof Storage === "undefined") return;
    
    (async () => {
      const user = JSON.parse(localStorage.getItem("User"));
      const userID = user.id;
      const cartobject = JSON.parse(localStorage.getItem(userID));
      const cartID = cartobject !== null ? cartobject.cartID : null;
  
      if (cartID) {
        try {
          const { cart } = await medusaClient.carts.retrieve(cartID);
          setCart(cart);
        } catch (error) {
          console.error("Error retrieving cart from Medusa:", error);
        }
      }
    })();
  }, []);
  
  useEffect(() => {
    const updateCartAndSendRequest = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/orders`,
          {
            order: cart.items,
          }
        );
        console.log("Order successfully sent to backend:", response.data);
        
        const user = JSON.parse(localStorage.getItem("User"));
        const userID = user.id;
        localStorage.removeItem(userID);
        localStorage.removeItem("cartCount");
        window.location.href = "/home";
      } catch (error) {
        console.error("Error sending order to backend:", error);
      }
    };
  
    if (typeof Storage !== "undefined") {
      updateCartAndSendRequest();
    }
  }, [cart]);
  
  return (
    <>
      <div className=" flex items-center justify-center text-[5rem]">
        <Check size={150} color="green" />
        <h1>Order Recieved</h1>
      </div>
    </>
  );
};

export default PaymentSuccess;
