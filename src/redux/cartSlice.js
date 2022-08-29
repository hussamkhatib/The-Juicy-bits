import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.push({
        ...action.payload,
        count: 1,
      });
    },
    removeProductFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
    setInitiial: () => {
      return initialState;
    },
    initCart: (state, action) => {
      return action.payload;
    },
    incrementProductCountFromCart: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
      item.count += 1;
    },
    decrementProductCountFromCart: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
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
  incrementProductCountFromCart,
  decrementProductCountFromCart,
} = slice.actions;

export const cartSelector = (state) => state.cart;
export const cartIdsSelector = (state) => state.cart.map((item) => item._id);

export default slice.reducer;
