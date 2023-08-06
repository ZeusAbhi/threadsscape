import { createSlice } from '@reduxjs/toolkit'
import { medusaClient } from '../utils/client'
const initialState = {
  cart: {}
 
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
      const variantID=action.payload
      const updatedCart=handleAddToCart(variantID)
      state.cart=updatedCart
      
    },
    deleteCart:(state,action)=>{
      const obj=action.payload
      const updatedCart=handleDeleteItem(obj.cartID,obj.lineItemID)
      state.cart=updatedCart
    }
  },
})
const handleAddToCart = async (variantID) => {
  const user = JSON.parse(localStorage.getItem("User"));
  if (user !== null) {
    if (variantID !== "") {
      //Add Products
      const userID = user.id;
      const cartobject = JSON.parse(localStorage.getItem(userID));

      const cartID = cartobject !== null ? cartobject.cartID : null;
      if (cartID != null) {
        const cart = await medusaClient.carts.retrieve(cartID);

        if (cart.items != null) {
          if (cart.items.length > 0) {
            let check = false;
            for (const item of cart.items) {
              if (item.variant_id === variantID) {
                check = true;
                const lineItemID = item.id;
                const { cart } = await medusaClient.carts.lineItems.update(cartID, lineItemID, {
                  quantity: item.quantity + 1,
                });
                localStorage.setItem("cartCount", cart.items.length);
                return cart;
              }
            }
            if (!check) {
              const { cart } = await medusaClient.carts.lineItems.create(cartID, {
                variant_id: variantID,
                quantity: 1,
              });
              localStorage.setItem("cartCount", cart.items.length);
              return cart;
            }
          }
        } else {
          const { cart } = await medusaClient.carts.lineItems.create(cartID, {
            variant_id: variantID,
            quantity: 1,
          });
          localStorage.setItem("cartCount", cart.items.length);
          return cart;
        }
      } else {
        //Create a cart if there isn't a pre-existing one
       
        const { cart } = await medusaClient.carts.create();
        localStorage.setItem(
          userID,
          JSON.stringify({ user_id: userID, cartID: cart.id })
        );

        const { cart: newCart } = await medusaClient.carts.lineItems.create(cart.id, {
          variant_id: variantID,
          quantity: 1,
        });
        localStorage.setItem("cartCount", newCart.items.length);
        return newCart;
      }
    }
  }
};
const handleDeleteItem= async (cartID,lineItemID)=>{
 
  const {cart}=await medusaClient.carts.lineItems
  .delete(cartID, lineItemID)
  localStorage.setItem("cartCount", cart.items.length);
 return cart
}
// Action creators are generated for each case reducer function
export const { addToCart,deleteCart} = cartSlice.actions

export default cartSlice.reducer