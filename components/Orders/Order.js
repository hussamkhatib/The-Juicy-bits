import { useDispatch, useSelector } from "react-redux";

import { selectPurchasedItem } from "../../redux/orderSlice";
import EmptyCart from "../Cart/EmptyCart";
import SliderHeader from "../SliderHeader";

const Order = () => {
  const purchasedItems = useSelector(selectPurchasedItem);

  return (
    <>
      <SliderHeader Component="Your Orders" />
      {purchasedItems.length ? null : <EmptyCart />}
    </>
  );
};

export default Order;
