import { CodegenConfig } from '@graphql-codegen/cli';

//Update Strapi Schema
// const config: CodegenConfig = {
//   schema: process.env.STRAPI_GQL_ENDPOINT || "http://localhost:1337/graphql",
//   documents: ['src/**/*.tsx'],
//   generates: {
//     './schema/__strapiGql__/': {
//       preset: 'client',
//       plugins: [],
//       presetConfig: {
//         gqlTagName: 'gql',
//       },
//     //   schema: process.env.STRAPI_GQL_ENDPOINT, // Add the schema field here
//     }
//   },
//   ignoreNoDocuments: true,
// };

//Update API Schema
const config: CodegenConfig = {
  schema: process.env.API_GQL_ENDPOINT || "http://localhost:3333/graphql",
  documents: ['src/**/*.tsx'],
  generates: {
    './schema/__apiGql__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    //   schema: process.env.STRAPI_GQL_ENDPOINT, // Add the schema field here
    }
  },
  ignoreNoDocuments: true,
};

export default config;
