import { gql } from "@apollo/client";

export const GET_PRODUCTS_LIST = gql(/* GraphQL */ `query {
	products {
		data {
			id
			attributes {
				Name
				Slug
				Price
				Slug
				Gallery {
					data {
						attributes {
							alternativeText
							url
							formats 
						}
					}
				}
			}
		}
	}
}`)