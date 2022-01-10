import { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/shared/Header'
import Layout from "../components/shared/Layout"
import RockContext from '../components/shared/RockContext'
import '../styles/style.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RockContext>
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
    </RockContext>
  )
}

export default MyApp
