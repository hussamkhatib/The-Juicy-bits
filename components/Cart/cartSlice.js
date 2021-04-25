import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'item',
  initialState: {
    value: [],
    counter: []
  }, 
  reducers: {
    addItem: (state,action) => {
      state.value.push(action.payload)  
      state.counter.push(1)
    },
    removeItem: (state,action) => {
      state.value.splice(action.payload,1)
      state.counter.splice(action.payload,1)
    },
    setInitiial: state => {
      state.value = []
      state.quantity = []
    },
    increment: (state,action) => {
      state.counter[action.payload] += 1 
    },
    decrement: (state,action) => {
      state.counter[action.payload] -= 1 
    },
  },
});

export const { addItem,removeItem,setInitiial,increment,decrement } = slice.actions;
export const selectItem = state => state.item.value;
export const  selectCounter = state => state.item.counter

export default slice.reducer;
