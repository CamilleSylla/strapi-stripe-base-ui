import { CreatePaymentIntent, MutationCreatePaymentIntentArgs } from "@/schema/__apiGql__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";
export interface CreatePaymentIntentMutation { createPaymentIntent: CreatePaymentIntent }

export const CREATE_PAYMENT_INTENT: TypedDocumentNode<CreatePaymentIntentMutation, MutationCreatePaymentIntentArgs> = gql(`
mutation createPaymentIntent($products: [CreatePaymentIntentInputs!]!) {
	createPaymentIntent(products: $products) {
		id
		client_secret
	}
}
`)

export const UPDATE_PAYMENT_INTENT = gql(`
mutation updatePaymentIntentShipping(
	$infos: UpdatePaymentIntentShippingInput!
	$client_secret: String!
) {
	updatePaymentIntentShipping(infos: $infos, client_secret: $client_secret) {
		client_secret
	}
}
`)