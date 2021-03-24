import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'item',
  initialState: {
    value: [
     {title: 'Mac Iphone',quantity : 1},
     {title: 'Mac Burns', quantity: 1}
  ]},
  reducers: {
    addItem: state => {
      state.value.push({title: 'Max Flurry',quantity:1})  
    },
    removeItem: (state,action) => {
      state.value.splice(action.payload.index, 1)
    }
  },
});

export const { addItem,removeItem } = slice.actions;
export const selectItem = state => state.item.value;

export default slice.reducer;
