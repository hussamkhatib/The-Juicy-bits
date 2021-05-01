import "../styles/index.css";
import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import store from '../redux/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>      
      <Layout>
        <Head>
          <link rel="shortcut icon" href="static/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
