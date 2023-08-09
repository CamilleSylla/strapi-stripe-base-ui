import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './cartSlice'

export default configureStore({
    reducer: {
        cart: counterSlice.reducer
    }, 
    devTools: true
})