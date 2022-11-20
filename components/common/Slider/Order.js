import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { allOrdersSelector } from "../../../src/redux/allOrdersSlice";
import { closeSlider } from "../../../src/redux/sliderSlice";
import EmptyCartIcon from "../../Icons/EmptyCartIcon";

const Order = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allOrders = useSelector(allOrdersSelector);

  if (!allOrders.length)
    return (
      <div className="flex flex-col items-center mt-6 text-xl">
        <EmptyCartIcon />
        <p className="mt-2">You have no previous Orders.</p>
      </div>
    );

  return (
    <div>
      {allOrders.map((order) => {
        console.log(order.orderCompletedAt, order.orderCompletedAt?.seconds);
        return (
          <div
            key={order.orderCompletedAt.seconds}
            className="flex justify-between items-center py-2 my-2"
          >
            <div>
              <p>
                Delivered {order.products.length}{" "}
                {order.products.length === 1 ? "Product" : "Products"}
              </p>
              <p className="text-gray-500">
                On <span>{order.orderCompletedAt}</span>
              </p>
            </div>
            <button
              onClick={() => {
                router.push(`/order/${order.id}`);
                dispatch(closeSlider());
              }}
            >
              <ChevronRightIcon className="h-6 w-6" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
