import { Product } from '@/types/gql'
import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs';


export interface CartStore {
  items: Array<Product & { uuid: string, quantity: 1 }>;
  order: {
    items: {
      name: string;
      price: number;
      quantity: number;
      uuid: string
    }[];
    total: number | null
  }
}

export const initialState: CartStore = {
  items: [],
  order: {
    items: [],
    total: 0
  }
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      state.items = [...state.items, actions.payload];
      state.order.items = [
        ...state.order.items, 
        { 
          name: actions.payload.Name, 
          price: actions.payload.Price, 
          quantity: actions.payload.quantity ,
          uuid: actions.payload.uuid
        }
      ]
      state.order.total = calculateTotal(state)
    },
    removeFromCart: (state, actions) => {
      state.items = state.items.filter(item => item.uuid !== actions.payload)
      state.order.items = state.order.items.filter(item => item.uuid !== actions.payload)
    },
    updateQuantity : (state, actions) => {
      const product = state.items.find(item => item.uuid === actions.payload.uuid)
      if (!product) {
        throw Error("Product not found")
      }
      const index = state.order.items.findIndex(item => item.uuid === actions.payload.uuid)
      state.order.items[index].quantity = actions.payload.value;
      state.order.total = calculateTotal(state)
    },
  }
})

const calculateTotal = (state: CartStore) => {
  return state.order.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const { addToCart, removeFromCart, updateQuantity } = counterSlice.actions

export default counterSlice.reducer