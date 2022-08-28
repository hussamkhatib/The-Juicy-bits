import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "../components/Cart/cartSlice";
import userReducer from "./userSlice";
import sliderReducer from "./sliderSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    item: itemReducer,
    openSlider: sliderReducer,
    user: userReducer,
    order: orderReducer,
  },
});
