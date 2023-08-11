import { apiGQLClient } from '@/apollo-client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { StoreProvider } from '@/store/StoreProvider'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ApolloProvider client={apiGQLClient}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
      </ApolloProvider>
    </StoreProvider>
  )
}
