/* eslint-disable @next/next/no-img-element */
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import debounce from "lodash.debounce";
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProductFromCartFB,
  updateProductCountInCartFB,
} from "../../src/firebase/helper";
import {
  cartSelector,
  decrementProductCountFromCart,
  incrementProductCountFromCart,
  removeProductFromCart,
} from "../../src/redux/cartSlice";
import { urlFor } from "../../utils/sanity";

const CartItems = () => {
  const cart = useSelector(cartSelector);
  return (
    <>
      {cart.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  );
};

export default CartItems;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    dispatch(incrementProductCountFromCart(product._id));
    debounceIncrementDecrement();
  };
  const decrement = () => {
    countRef.current -= 1;
    dispatch(decrementProductCountFromCart(product._id));
    debounceIncrementDecrement();
  };

  const deleteProduct = () => {
    dispatch(removeProductFromCart(product._id));
    deleteProductFromCartFB(product._id);
  };

  const debounceIncrementDecrement = useMemo(
    () =>
      debounce(() => {
        updateProductCountInCartFB(product._id, countRef.current);
        countRef.current = 0;
      }, 400),
    [product._id]
  );

  return (
    <div className="flex justify-between mt-6">
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
              onClick={() => increment()}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <PlusCircleIcon className="h-5 w-5" aria-hidden />
            </button>
            <span className="text-gray-700 mx-2">{product.count}</span>
            <button
              disabled={product.count < 2}
              onClick={() => decrement()}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <MinusCircleIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={() => deleteProduct()}>
          <TrashIcon className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
};
