import React from "react";
import SliderContainer from "../SliderContainer";
import Cart from "../Cart/Cart";
// import Profile from "../Profile/Profile";
import Order from "../Orders/Order";
import ContactUs from "../ContactUs";
import EditProfile from "../Profile/EditProfile";
import { useSelector } from "react-redux";
import { openSliderComponentState } from "../../redux/sliderSlice";

const Aside = () => {
  const sliderState = useSelector(openSliderComponentState);

  return (
    <SliderContainer>
      {sliderState === "Cart" && <Cart />}
      {/* {sliderState === "profile" && <Profile />} */}
      {sliderState === "Your Orders" && <Order />}
      {sliderState === "Contact us" && <ContactUs />}
      {sliderState === "Edit Profile" && <EditProfile />}
    </SliderContainer>
  );
};

export default Aside;
