import { ApolloClient, InMemoryCache } from "@apollo/client";

const strapiGqlClient = new ApolloClient({
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
    },
    uri: process.env.STRAPI_GQL_ENDPOINT || "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
});

export const apiGQLClient = new ApolloClient({
    headers: {},
    uri: process.env.API_GQL_ENDPOINT || "http://localhost:3333/graphql",
    cache: new InMemoryCache(),
})

export default strapiGqlClient;