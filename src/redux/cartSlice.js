import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const slice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.push({
        ...action.payload,
        count: 1,
      });
    },
    removeProductFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    setInitiial: () => {
      return initialState;
    },
    initCart: (state, action) => {
      return action.payload;
    },
    increment: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.count += 1;
    },
    decrement: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.count > 1) {
        item.count -= 1;
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  setInitiial,
  initCart,
  increment,
  decrement,
} = slice.actions;

export const cartSelector = (state) => state.cart;

export default slice.reducer;
