import { createSlice } from "@reduxjs/toolkit"

export interface PaymentStore {
    payment_intent : {
        client_secret:  string | null
    }
  }

  export const initialState: PaymentStore = {
    payment_intent: {
        client_secret : null
    }
  }

  export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers : {
        addClientSecret: (state, actions) => {
            state.payment_intent.client_secret = actions.payload
        },
        clearPaymentStore: (state) => {
            state = {
                payment_intent: {
                    client_secret: null
                }
            }
        }
    }
  })


  export const {addClientSecret, clearPaymentStore} = paymentSlice.actions

  export default paymentSlice.reducer