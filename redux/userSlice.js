import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "currentUser",
  initialState: {
    value: {
      logIn: false,
      name: null,
      mobileNumber: "",
      location: "",
      pincode: "",
    },
  },
  reducers: {
    LogInUser: (state, action) => {
      state.value = {
        logIn: true,
        name: action.payload[0],
        mobileNumber: action.payload[1],
        location: action.payload[2],
        pincode: action.payload[3],
      };
    },
    LogOutUser: (state) => {
      state.value = {
        logIn: false,
        name: null,
      };
    },
  },
});

export const { LogInUser, LogOutUser } = slice.actions;
export const userLoggedState = (state) => state.currentUser.value;

export default slice.reducer;
