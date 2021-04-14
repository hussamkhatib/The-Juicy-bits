import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../components/Cart/cartSlice'

import userReducer from './userSlice'
import sliderReducer from './sliderSlice'


export default configureStore({
    reducer:{
        item: itemReducer,
        openSlider: sliderReducer,
        currentUser: userReducer
    } 
})