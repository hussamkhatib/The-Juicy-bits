import React from "react";
import { useSelector } from "react-redux";

import { cartSelector } from "../../src/redux/cartSlice";
import CartItems from "./CartItems";
import Checkout from "./Checkout";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(cartSelector);
  if (Array.isArray(cart) && !cart.length) {
    return <EmptyCart />;
  }
  return (
    <>
      <CartItems />
      <Checkout />
    </>
  );
}

export default Cart;
