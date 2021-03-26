import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../components/Cart/cartSlice'
import openCartReducer from '../components/Cart/openCartSlice'

export default configureStore({
    reducer:{
        item: itemReducer,
        openCart: openCartReducer
    } 
})