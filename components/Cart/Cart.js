import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartSelector } from "../../src/redux/orderSlice";
import { openSlider } from "../../src/redux/sliderSlice";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(cartSelector);
  if (Array.isArray(cart) && !cart.length) {
    return <EmptyCart />;
  }
  return (
    <>
      <CartItems cart={cart} />
      <Checkout />
    </>
  );
}

export default Cart;

const Checkout = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openSlider("Shipping Address"))}
      className="w-full flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      <span>Chechout</span>
      <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden />
    </button>
  );
};
