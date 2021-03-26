import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'openCart',
  initialState: {
      value: false
    }, 
  reducers: {
    openCart: state => {
        state.value = true
    },
    toggleCart: state => {
        state.value = !state.value
    }
  },
});

export const { openCart,toggleCart } = slice.actions;
export const openOrClose = state => state.openCart.value;

export default slice.reducer;
