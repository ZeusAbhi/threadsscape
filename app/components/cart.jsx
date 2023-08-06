"use-client";
import React, { useEffect, useState } from "react";
import { medusaClient } from "../utils/client";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../redux/cartslice";

const Cart = () => {
  const [cart, setCart] = useState({});
  const { Cart } = useSelector((state) => state.cart);
  const [exchangeRate, setExchangeRate] = useState(0);

  const dispatch = useDispatch();
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

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 text-sm ">
        {cart.items &&
          cart.items.map((e) => {
            return (
              <>
                <div className="flex gap-6">
                  <div className="flex w-72   gap-5" key={e.variant_id}>
                    <div
                      className="h-[8rem] w-[8rem] bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${e.thumbnail})` }}
                    ></div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[0.8rem] text-black">{e.title}</p>
                      <p className="text-[0.7rem] text-black">
                        Size: {e.description}
                      </p>
                      <p className="text-[0.7rem] text-black">
                        Quantity: {e.quantity}
                      </p>
                      <button
                        onClick={() => {
                          dispatch(
                            deleteCart({ cartID: cart.id, lineItemID: e.id })
                          );
                        }}
                      >
                        <Trash2 color="red" size={15} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[0.8rem]">
                      ₹
                      {(
                        parseFloat(e.unit_price / 100) *
                        exchangeRate *
                        e.quantity
                      ).toFixed(2)}
                    </h3>
                  </div>
                </div>
              </>
            );
          })}
        <h3>
          Subtotal(inc.taxes){" "}
          <span className="mx-5">
            {" "}
            ₹{(parseFloat(cart.subtotal / 100) * exchangeRate).toFixed(2)}
          </span>
        </h3>
        <a
          href="/checkout"
          className="  flex h-10 w-36 items-center   justify-center border-[1.5px] border-black bg-black text-sm text-white outline-none transition-all hover:bg-white hover:text-black"
        >
          Checkout
        </a>
      </div>
    </>
  );
};

export default Cart;
