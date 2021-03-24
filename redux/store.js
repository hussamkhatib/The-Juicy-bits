import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../components/Cart/cartSlice'

export default configureStore({
    reducer:{
        item: itemReducer
    } 
})