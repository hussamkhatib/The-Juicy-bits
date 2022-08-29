import React from "react";
import { useSelector } from "react-redux";

import { cartSelector } from "../../src/redux/cartSlice";
import Cancel from "../Buttons/Cancel";
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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <Cancel />
      </div>
      <hr />
      <CartItems />
      <Checkout />
    </>
  );
}

export default Cart;
