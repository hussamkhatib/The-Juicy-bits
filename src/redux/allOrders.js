import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const slice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    initAllOrders: (state, action) => {
      return action.payload;
    },
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { initAllOrders, addOrder } = slice.actions;
export const allOrdersSelector = (state) => state.allOrders;

export default slice.reducer;
