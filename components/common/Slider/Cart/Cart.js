import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartSelector } from "../../../../src/redux/orderSlice";
import { openSlider } from "../../../../src/redux/sliderSlice";
import Button from "../../Button";
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
    <Button
      variant="primary"
      onClick={() => dispatch(openSlider("Shipping Address"))}
      padding="px-3 py-2"
      className="w-full flex items-center justify-center mt-4 text-sm uppercase font-medium"
    >
      Checkout
      <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden />
    </Button>
  );
};
