import "../styles/index.css";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";

import { auth } from "../src/firebase";
import { getUserCart, getUserOrders } from "../src/firebase/helper";
import { getUserDetails } from "../src/firebase/user.firebase";
import { initAllOrders } from "../src/redux/allOrdersSlice";
import { initOrder } from "../src/redux/orderSlice";
import { initShippingAddress } from "../src/redux/shippingAddressSlice";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <InitUser />
    </Provider>
  );
}

export default MyApp;

const InitUser = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  async function fetchCart() {
    const { total, products } = await getUserCart();
    const orders = await getUserOrders();
    const userDetails = await getUserDetails();
    const shippingAddress = userDetails?.ShippingAddress || [];
    dispatch(initAllOrders(orders));
    dispatch(initShippingAddress(shippingAddress));
    dispatch(
      initOrder({
        cart: products,
        total,
        shippingAddress: null,
      })
    );
  }

  useEffect(() => {
    if (user) {
      fetchCart();
    }
    //  'fetchCart' is intentionally not in the dependency list
    //  Cart is initially not rendered, we are just making it available beforehand to avoid a loading state later
  }, [user]);
  return null;
};
