/* eslint-disable @next/next/no-img-element */
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cartSelector,
  decrementProductCount,
  incrementProductCount,
  removeProductFromCart,
} from "../../src/redux/cartSlice";
import { urlFor } from "../../utils/sanity";
import EmptyCart from "./EmptyCart";

const CartItems = () => {
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector);
  if (Array.isArray(cart) && !cart.length) {
    return <EmptyCart />;
  }

  return (
    <>
      {cart.map((product) => (
        <div key={product.id} className="flex justify-between mt-6">
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded"
              src={urlFor(product.mainImage)
                .auto("format")
                .width(200)
                .fit("crop")
                .quality(80)}
              alt={product.mainImage?.alt || `Photo of ${product.title}`}
            />
            <div className="mx-3">
              <h3 className="text-sm text-gray-600">{product.title}</h3>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => dispatch(incrementProductCount(product.id))}
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  <PlusCircleIcon className="h-5 w-5" aria-hidden />
                </button>
                <span className="text-gray-700 mx-2">{product.count}</span>
                <button
                  disabled={product.count < 2}
                  onClick={() => dispatch(decrementProductCount(product.id))}
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  <MinusCircleIcon className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => dispatch(removeProductFromCart(product.id))}>
              <TrashIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItems;
