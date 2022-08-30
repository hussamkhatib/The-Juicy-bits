import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const slice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {
    initShippingAddress: (state, action) => {
      return action.payload;
    },
    addShippingAddress: (state, action) => {
      state.push(action.payload);
    },
    removeShippingAddress: (state, action) => {
      //   state.splice(action.payload, 1);
    },
  },
});

export const {
  initShippingAddress,
  addShippingAddress,
  //   removeShippingAddress,
} = slice.actions;
export const shippingAddressesSelector = (state) => state.shippingAddress;

export default slice.reducer;
