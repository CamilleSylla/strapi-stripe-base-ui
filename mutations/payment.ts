import { CreatePaymentIntent, MutationCreatePaymentIntentArgs } from "@/schema/__apiGql__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";
export interface CreatePaymentIntentMutation { createPaymentIntent: CreatePaymentIntent }

export const CREATE_PAYMENT_INTENT: TypedDocumentNode<CreatePaymentIntentMutation, MutationCreatePaymentIntentArgs> = gql(`
mutation createPaymentIntent($products: [CreatePaymentIntentInputs!]!) {
	createPaymentIntent(products: $products) {
		client_secret
	}
}
`)