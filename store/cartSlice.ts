import { Product } from '@/types/gql'
import { createSlice } from '@reduxjs/toolkit'


export interface CartStore {
    items : Array<Product & {slug: string, uuid: string}>
}

export const initialState : CartStore = {
    items: []
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      state.items = [...state.items, actions.payload]
    }
  }
})

export const { addToCart } = counterSlice.actions

export default counterSlice.reducer