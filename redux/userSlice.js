import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'currentUser',
  initialState: {
    value:{
      logIn: false,
      name: ''
    }
  }, 
  reducers: {
    LogInUser: (state,action) => {
        state.value = {
          logIn: true,
          name: action.payload
        }
    },
    LogOutUser: state => {
      state.value = {
        logIn:false,
        name: ''
      }
    }
  },
});

export const { LogInUser,LogOutUser} = slice.actions;
export const userLoggedState = state => state.currentUser.value;

export default slice.reducer;
