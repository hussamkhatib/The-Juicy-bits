import { ArrowLeftCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeSlider,
  goToPrevSlider,
  sliderSelector,
} from "../../src/redux/sliderSlice";
import Cart from "../Cart";
import ContactUs from "../ContactUs";
import Checkout from "../form/Checkout";
import ShippingAddress from "../form/ShippingAddress";
import Order from "../Orders";
import EditProfile from "../Profile/EditProfile";
import Profile from "../Profile/Profile";

const sliders = {
  Cart: <Cart />,
  Profile: <Profile />,
  "Your Orders": <Order />,
  "Contact Us": <ContactUs />,
  "Edit Profile": <EditProfile />,
  "Shipping Address": <ShippingAddress />,
  Checkout: <Checkout />,
};

const Slider = () => {
  const dispatch = useDispatch();
  const sliderState = useSelector(sliderSelector);
  return (
    <div
      className={`${
        sliderState ? "translate-x-0 ease-out" : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 overflow-y-auto bg-white border-l-2 border-gray-300`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => dispatch(goToPrevSlider())}
          className="text-gray-600 focus:outline-none"
        >
          <ArrowLeftCircleIcon className="h-6 w-6" aria-hidden />
        </button>
        <h3 className="text-2xl font-medium text-gray-700">{sliderState}</h3>
        <button
          onClick={() => dispatch(closeSlider())}
          className="text-gray-600 focus:outline-none"
        >
          <XCircleIcon className="w-6 h-6" aria-hidden />
        </button>
      </div>
      <hr className="my-3" />
      {sliders[sliderState]}
    </div>
  );
};

export default Slider;
