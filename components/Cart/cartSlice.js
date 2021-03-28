import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'item',
  initialState: {
    value: []
  }, 
  reducers: {
    addItem: (state,action) => {
      state.value.push({title:action.payload[0],
                      quantity:action.payload[1],
                      imgSrc:action.payload[2],
                      price:action.payload[3]
                      })  
    },
    removeItem: (state,action) => {
      state.value.splice(action.payload, 1)
    },
    increment: (state,action) => {
      state.value[action.payload].quantity += 1
    },
    decrement: (state,action) => {
      state.value[action.payload].quantity -= 1
    },
  },
});

export const { addItem,removeItem,increment,decrement } = slice.actions;
export const selectItem = state => state.item.value;

export default slice.reducer;
