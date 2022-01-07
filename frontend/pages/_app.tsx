import { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/shared/Header'
import Layout from "../components/shared/Layout"
import '../styles/style.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
