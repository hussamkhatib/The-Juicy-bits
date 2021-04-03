import "../styles/index.css";
import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import store from '../redux/store'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
