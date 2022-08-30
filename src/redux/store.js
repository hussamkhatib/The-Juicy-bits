import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./orderSlice";
import shippingAddressReducer from "./shippingAddressSlice";
import sliderReducer from "./sliderSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    slider: sliderReducer,
    user: userReducer,
    order: orderReducer,
    shippingAddress: shippingAddressReducer,
  },
});
