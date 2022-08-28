import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
export const slice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push({
        ...action.payload,
        count: 1,
      });
    },
    removeProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    setInitiial: () => {
      return initialState;
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
  addProduct,
  removeProduct,
  setInitiial,
  increment,
  decrement,
} = slice.actions;

export const cartSelector = (state) => state.cart;

export default slice.reducer;

export const addProductToCart = (payload) => (dispatch) => {
  console.log("Hey HEo");
  dispatch(addProduct(payload));
};

export const removeProductFromCart = (payload) => async (dispatch) => {
  dispatch(removeProduct(payload));
};

export const incrementProductCount = (payload) => (dispatch) => {
  dispatch(increment(payload));
};

export const decrementProductCount = (payload) => (dispatch) => {
  dispatch(decrement(payload));
};
