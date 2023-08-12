import { configureStore } from '@reduxjs/toolkit'
import { CartStore, counterSlice } from './cartSlice'
import {PaymentStore, paymentSlice} from './paymentSlice'

export interface ReduxStore {
    cart : CartStore
    payment: PaymentStore
}
export const store = configureStore({
    reducer: {
        cart: counterSlice.reducer,
        payment: paymentSlice.reducer
    }, 
    devTools: true
})

export default store