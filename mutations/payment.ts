import { gql } from "@apollo/client";

export const CREATE_PAYMENT_INTENT = gql(`
mutation createPaymentIntent($products: [CreatePaymentIntentInputs!]!) {
	createPaymentIntent(products: $products) {
		client_secret
	}
}
`)