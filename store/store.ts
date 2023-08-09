import { configureStore } from '@reduxjs/toolkit'
import { CartStore, counterSlice } from './cartSlice'

export interface ReduxStore {
    cart : CartStore
}

export default configureStore({
    reducer: {
        cart: counterSlice.reducer
    }, 
    devTools: true
})