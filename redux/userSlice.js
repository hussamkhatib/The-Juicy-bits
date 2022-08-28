import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    signInUser: (state, action) => {
      return action.payload;
    },
    signOutUser: () => {
      return initialState;
    },
  },
});

export const { signInUser, signOutUser } = slice.actions;
export const userSelector = (state) => state.user;

export default slice.reducer;
