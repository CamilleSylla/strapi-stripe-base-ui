import { createSlice } from '@reduxjs/toolkit'

export interface CartStore {
    items : {id: string}[]
}

export const initialState : CartStore = {
    items: []
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, actions) => {
      state.items = [...state.items, actions.payload]
    }
  }
})

export const { add } = counterSlice.actions

export default counterSlice.reducer