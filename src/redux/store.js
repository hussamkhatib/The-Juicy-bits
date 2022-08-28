import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import sliderReducer from "./sliderSlice";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    cart: itemReducer,
    openSlider: sliderReducer,
    user: userReducer,
    order: orderReducer,
  },
});
