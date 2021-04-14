import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'openSlider',
  initialState: {
      value: false,
      open: ''
    }, 
  reducers: {
    openCart: state => {
        state.value = true
        state.open = 'cart'
    },
    openProfile: state => {
        state.value = true
        state.open = 'profile' 
    }
    ,
    cancel: state => {
        state.value = !state.value
        state.open = null
    }
  },
});

export const { openCart,openProfile,cancel } = slice.actions;
export const openOrClose = state => state.openSlider.value;
export const cartOrProfile = state =>  (state.openSlider.open || '');

export default slice.reducer;
