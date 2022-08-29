import { useSelector } from "react-redux";

import { selectPurchasedItem } from "../../src/redux/orderSlice";
import EmptyCart from "../Cart/EmptyCart";

const Order = () => {
  const purchasedItems = useSelector(selectPurchasedItem);

  return <>{purchasedItems.length ? null : <EmptyCart />}</>;
};

export default Order;
