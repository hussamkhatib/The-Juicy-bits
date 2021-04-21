import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'item',
  initialState: {
    value: [],
    counter: 1
  }, 
  reducers: {
    addItem: (state,action) => {
      state.value.push(action.payload)  
    },
    removeItem: (state,action) => {
      state.value.splice(action.payload, 1)
    },
    increment: state => {
      state.counter += 1
    },
    decrement: state => {
      state.counter -= 1
    },
  },
});

export const { addItem,removeItem,increment,decrement } = slice.actions;
export const selectItem = state => state.item.value;
export const  selectCounter = state => state.item.counter

export default slice.reducer;
