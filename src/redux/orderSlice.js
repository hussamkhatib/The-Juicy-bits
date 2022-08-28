import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "order",
  initialState: {
    value: [],
  },
  reducers: {
    addPurchasedItem: (state, action) => {
      state.value.push(action.payload);
    },
    setInitiial: (state) => {
      state.value = [];
    },
  },
});

export const { addPurchasedItem, setInitiial } = slice.actions;
export const selectPurchasedItem = (state) => state.order.value;

export default slice.reducer;
