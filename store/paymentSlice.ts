import { UserInformations } from "@/types/base";
import { createSlice } from "@reduxjs/toolkit"



export interface PaymentStore {
    payment_intent: {
        client_secret: string | null
    };
    client_informations?: UserInformations;
    billing_informations?: UserInformations
}

export const initialState: PaymentStore = {
    payment_intent: {
        client_secret: null
    },
    client_informations: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        adress: {
            city: "",
            country: "",
            street: "",
            zip: ""
        }
    },
    billing_informations: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        adress: {
            city: "",
            country: "",
            street: "",
            zip: ""
        }
    }
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
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


export const { addClientSecret, clearPaymentStore } = paymentSlice.actions

export default paymentSlice.reducer