import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'form',
  initialState: {
      value: false,
    }, 
  reducers: {
    toggleForm : (state,action) => {
      state.value = action.payload ? false: !state.value
      state.formState = 'Sign up'
    },
    toggleSignInSignUp : state => {
        state.formState = 'Sign up' ? 'Sign in' : 'Sign up'
    }
  },
});

export const { toggleForm,toggleSignInSignUp } = slice.actions;
export const openOrCloseFormComponent = state => state.form.value;
export const signInOrSignOutComponent = state => state.form.formState;

export default slice.reducer;
