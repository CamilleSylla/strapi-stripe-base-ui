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

export const GET_PRODUCT_BY_ID = gql(`query getProductByID($slug: String!) {
	productBySlug(slug: $slug) {
		Name
		Description
		Name
		Price
		Exerpt
		Gallery {
			data {
				attributes {
					url
					formats
					alternativeText
				}
			}
		}
	}
}`)