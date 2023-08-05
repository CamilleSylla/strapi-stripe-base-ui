import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.STRAPI_GQL_ENDPOINT || "http://localhost:1337/graphql",
  documents: ['src/**/*.tsx'],
  generates: {
    './schema/__strapiGql__/': {
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
