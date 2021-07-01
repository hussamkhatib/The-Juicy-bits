import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "openSlider",
  initialState: {
    value: false,
    open: "",
  },
  reducers: {
    openSliderComponent: (state, action) => {
      state.value = true;
      state.open = action.payload;
    },
    cancel: (state) => {
      state.value = !state.value;
      state.open = null;
    },
  },
});

export const { cancel, openSliderComponent } = slice.actions;
export const openOrClose = (state) => state.openSlider.value;
export const openSliderComponentState = (state) => state.openSlider.open;

export default slice.reducer;
