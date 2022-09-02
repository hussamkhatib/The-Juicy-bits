import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelector } from "react-redux";

import { allOrdersSelector } from "../../src/redux/allOrders";
import EmptyCartIcon from "../Icons/EmptyCartIcon";

const Order = () => {
  const allOrders = useSelector(allOrdersSelector);

  if (!allOrders.length)
    return (
      <div className="flex flex-col justify-center mt-6 text-xl">
        <EmptyCartIcon />
        <p className="mt-2">You have no previous Orders.</p>
      </div>
    );

  return (
    <div>
      {allOrders.map((order) => {
        return (
          <Link
            href={`/order/${order.id}`}
            key={order.orderCompletedAt.seconds}
          >
            <a className="flex justify-between items-center py-2 my-2">
              <div>
                <p>
                  Delivered {order.products.length}{" "}
                  {order.products.length === 1 ? "Product" : "Products"}
                </p>
                <p className="text-gray-500">
                  On <span>{order.orderCompletedAt}</span>
                </p>
              </div>
              <ChevronRightIcon className="h-6 w-6" aria-hidden />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Order;
