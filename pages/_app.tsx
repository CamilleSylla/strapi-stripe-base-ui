import { apiGQLClient } from '@/apollo-client'
import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { StoreProvider } from '@/store/StoreProvider'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter()
  const Layout = useMemo(() => {
    if (router.pathname.includes('/paiement')) {
      return CheckoutLayout
    }
    return DefaultLayout
  }, [router.pathname]
  )

  return (
    <StoreProvider>
      <ApolloProvider client={apiGQLClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </StoreProvider>
  )
}
