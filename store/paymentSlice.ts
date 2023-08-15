import { UserInformations } from "@/types/base";
import { createSlice } from "@reduxjs/toolkit"



export interface PaymentStore {
    payment_intent: {
        client_secret: string | null
    };
    shipping_adress?: UserInformations | null;
    billing_adress?: UserInformations | null
}

export const initialState: PaymentStore = {
    payment_intent: {
        client_secret: null
    },
    shipping_adress: {
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
    billing_adress: {
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
        addBillingAdress: (state, actions) => {
            console.log(actions.payload);
            
            state.billing_adress = actions.payload
        },
        addShippingAdress: (state, actions) => {
            state.shipping_adress = actions.payload
        },
        clearPaymentStore: (state) => {
            state = {
                payment_intent: {
                    client_secret: null
                },
                shipping_adress: null,
                billing_adress: null
            }
        }
    }
})


export const { addClientSecret,addShippingAdress, addBillingAdress, clearPaymentStore } = paymentSlice.actions

export default paymentSlice.reducer