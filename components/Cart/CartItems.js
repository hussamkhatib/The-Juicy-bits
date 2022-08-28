/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { urlFor } from "../../utils/sanity";
import Minus from "../Svg/Minus";
// import Plus from "../Svg/Plus";
import {
  decrement,
  // increment,
  removeItem,
  selectCounter,
  selectItem,
} from "./cartSlice";
import EmptyCart from "./EmptyCart";

const CartItems = () => {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);
  const counter = useSelector(selectCounter);

  if (!item.length) {
    return <EmptyCart />;
  }

  const removeProductFromCart = (index) => {
    dispatch(removeItem(index));
    console.log("deletion product from cart called");
  };

  return (
    <>
      {item.map((item, index) => (
        <div key={item.title} className="flex justify-between mt-6">
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded"
              src={urlFor(item.mainImage)
                .auto("format")
                .width(200)
                .fit("crop")
                .quality(80)}
              alt={item.mainImage?.alt || `Photo of ${item.title}`}
            />
            <div className="mx-3">
              <h3 className="text-sm text-gray-600">{item.title}</h3>
              <div className="flex items-center mt-2">
                <span className="text-gray-700 mx-2">{counter[index]}</span>
                <button
                  disabled={counter[index] < 2}
                  onClick={() => dispatch(decrement(index))}
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  <Minus />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button onClick={() => removeProductFromCart(index)} className="">
              trash
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItems;
