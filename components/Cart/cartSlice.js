import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'item',
  initialState: {
    value: [
     {title: 'Mac Iphone',quantity : 1},
     {title: 'Mac Burns', quantity: 1}
  ]}, 
  reducers: {
    addItem: (state,action) => {
      state.value.push({title:action.payload[0],quantity:action.payload[1]})  
    },
    removeItem: (state,action) => {
      state.value.splice(action.payload, 1)
    }
  },
});

export const { addItem,removeItem } = slice.actions;
export const selectItem = state => state.item.value;

export default slice.reducer;
