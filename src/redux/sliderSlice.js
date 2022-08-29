import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const slice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    openSlider: (state, action) => {
      state.push(action.payload);
    },
    goToPrevSlider: (state) => {
      state.pop();
    },
    closeSlider: () => {
      return initialState;
    },
  },
});

export const { closeSlider, openSlider, goToPrevSlider } = slice.actions;
export const sliderSelector = (state) => state.slider.at(-1);
export const tempSelector = (state) => state.slider;

export default slice.reducer;
