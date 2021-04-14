import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'openProfile',
  initialState: {
      value: false
    }, 
  reducers: {
    openProfile: state => {
        state.value = true
    },
    toggleProfile: state => {
        state.value = !state.value
    }
  },
});

export const { openProfile,toggleProfile } = slice.actions;
export const openOrCloseProfie = state => state.openProfile.value;

export default slice.reducer;
