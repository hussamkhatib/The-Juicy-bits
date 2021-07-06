import SliderHeader from "../SliderHeader";
import EmptyCart from "../Cart/EmptyCart";
import { useSelector, useDispatch } from "react-redux";
import { selectPurchasedItem } from "../../redux/orderSlice";

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
