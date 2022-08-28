import "../styles/index.css";

import { Provider } from "react-redux";

import Layout from "../components/common/Layout";
import store from "../src/redux/store";

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
