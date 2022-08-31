import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  shippingAddress: null,
  total: 0,
};

export const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    initOrder: (state, action) => {
      return action.payload;
    },
    // Cart
    addProductToCart: (state, action) => {
      state.total += action.payload.defaultProductVariant.price;
      state.cart.push({
        ...action.payload,
        count: 1,
      });
    },
    removeProductFromCart: (state, action) => {
      state.total -=
        action.payload.defaultProductVariant.price * action.payload.count;
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    setInitialOrder: () => {
      return initialState;
    },
    incrementProductCountFromCart: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      state.total += item.defaultProductVariant.price;
      item.count += 1;
    },
    decrementProductCountFromCart: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item.count > 1) {
        state.total -= item.defaultProductVariant.price;
        item.count -= 1;
      }
    },

    // Shipping Address
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const {
  initOrder,
  addProductToCart,
  removeProductFromCart,
  setInitialOrder,
  incrementProductCountFromCart,
  decrementProductCountFromCart,
  setShippingAddress,
} = slice.actions;

// cart
export const cartSelector = (state) => state.order.cart;
export const cartIdsSelector = (state) =>
  state.order.cart.map((item) => item._id);
// shipping address
export const shippingAddressSelector = (state) => state.order.shippingAddress;
export const totalAmountSelector = (state) => state.order.total;

export default slice.reducer;
