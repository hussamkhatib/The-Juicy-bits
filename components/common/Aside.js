import React from "react";
import { useSelector } from "react-redux";

import { openSliderComponentState } from "../../redux/sliderSlice";
import Cart from "../Cart/Cart";
import ContactUs from "../ContactUs";
import Order from "../Orders/Order";
import EditProfile from "../Profile/EditProfile";
import Profile from "../Profile/Profile";
import SliderContainer from "../SliderContainer";

const Aside = () => {
  const sliderState = useSelector(openSliderComponentState);

  return (
    <SliderContainer>
      {sliderState === "Cart" && <Cart />}
      {sliderState === "profile" && <Profile />}
      {sliderState === "Your Orders" && <Order />}
      {sliderState === "Contact us" && <ContactUs />}
      {sliderState === "Edit Profile" && <EditProfile />}
    </SliderContainer>
  );
};

export default Aside;
