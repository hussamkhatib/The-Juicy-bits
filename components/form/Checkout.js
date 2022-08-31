import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { completeCheckout } from "../../src/firebase/helper";
import { addOrder } from "../../src/redux/allOrders";
import {
  cartSelector,
  setInitialOrder,
  shippingAddressSelector,
  totalAmountSelector,
} from "../../src/redux/orderSlice";
import { closeSlider } from "../../src/redux/sliderSlice";
import { ReadOnlyCartItems } from "../Cart/CartItems";
import Modal from "../common/Modal";
import { EditShippingAddress } from "./ShippingAddress";

const Checkout = () => {
  const dispatch = useDispatch();
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const cart = useSelector(cartSelector);
  const shippingAddress = useSelector(shippingAddressSelector);
  const total = useSelector(totalAmountSelector);
  const idRef = useRef();

  const placeOrder = async () => {
    const { id, orderCompletedAt } = await completeCheckout(
      cart,
      shippingAddress,
      total
    );
    idRef.current = id;
    dispatch(
      addOrder({
        prodcuts: cart,
        total,
        shippingAddress,
        orderCompletedAt,
      })
    );
    dispatch(setInitialOrder());
    dispatch(closeSlider());
    setIsOrderCompleted(true);
  };
  if (isOrderCompleted)
    return (
      <Modal
        main={<OrderSucessfull id={idRef.current} />}
        state={{ open: isOrderCompleted, setOpen: setIsOrderCompleted }}
      />
    );

  return (
    <div>
      <section className="mb-4">
        <h3 className="mb-6 text-lg font-semibold">Shipping Address</h3>
        <EditShippingAddress shippingAddress={shippingAddress} />
      </section>
      <section>
        <h3 className="mb-6 text-lg font-semibold">Order List</h3>
        <ReadOnlyCartItems cart={cart} />
      </section>
      <h3 className="my-6 text-lg font-semibold text-end">Total: Rs {total}</h3>
      <button
        className="w-full flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        onClick={() => placeOrder()}
      >
        Complete Order
      </button>
    </div>
  );
};

export default Checkout;

const OrderSucessfull = ({ id }) => {
  return id ? (
    <div>
      <h1 className="text-center font-bold text-xl">Order Successfull!</h1>
      <p className="text-center my-2">
        You have successfully completed the order.
      </p>
      {/* TODO: add this page */}
      <Link href={`/orders/${id}`}>
        <a className="w-full flex items-center justify-center px-3 mt-2 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          View Order
        </a>
      </Link>
    </div>
  ) : null;
};
