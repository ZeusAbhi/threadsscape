"use-client";
import React, { useEffect, useState } from "react";
import { medusaClient } from "../utils/client";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../redux/cartSlice";

const Cart = () => {
  const [cart, setCart] = useState({});
  const { Cart } = useSelector((state) => state.cart);
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

          cart.items && localStorage.setItem("cartCount", cart.items.length);
        }
      }
    };
    getCart();
  }, [Cart, []]);

  return (
    <>
      <div className="flex flex-col gap-5 text-sm ">
        {cart.items &&
          cart.items.map((e) => {
            return (
              <>
                <div className="flex gap-3" key={e.variant_id}>
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
              </>
            );
          })}
      </div>
    </>
  );
};

export default Cart;
