import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const slice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    initAllOrders: (state, action) => {
      return action.payload;
    },
    addOrdertoAllOrders: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { initAllOrders, addOrdertoAllOrders } = slice.actions;
export const allOrdersSelector = (state) => state.allOrders;

export default slice.reducer;
