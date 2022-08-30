/* eslint-disable @next/next/no-img-element */
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import debounce from "lodash.debounce";
import React, { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  deleteProductFromCartFB,
  updateProductCountInCartFB,
} from "../../src/firebase/helper";
import {
  decrementProductCountFromCart,
  incrementProductCountFromCart,
  removeProductFromCart,
} from "../../src/redux/orderSlice";
import { urlFor } from "../../utils/sanity";

const CartItems = ({ cart }) => {
  return (
    <>
      {cart.map((product) => (
        <Product key={product._id} product={product} />
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
    dispatch(removeProductFromCart(product));
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

export const ReadOnlyCartItems = ({ cart }) => {
  return (
    <>
      {cart.map((product) => (
        <ReadOnlyProduct key={product._id} product={product} />
      ))}
    </>
  );
};

const ReadOnlyProduct = ({ product }) => {
  const {
    title,
    count,
    mainImage,
    defaultProductVariant: { price },
  } = product;
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <img
          className="h-20 w-20 object-cover rounded"
          src={urlFor(mainImage)
            .auto("format")
            .width(200)
            .fit("crop")
            .quality(80)}
          alt={mainImage?.alt || `Photo of ${title}`}
        />
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p>Rs {price * count}</p>
        </div>
      </div>
      <div className="flex items-end  ">
        <span className="w-6 h-6 flex items-center justify-center p-2 text-sm rounded-full bg-gray-200">
          {count}
        </span>
      </div>
    </div>
  );
};
