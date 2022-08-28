import { useDispatch } from "react-redux";

import { cancel } from "../../redux/sliderSlice";
import EmptyCartIcon from "../Svg/EmptyCartIcon";

const EmptyCart = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center my-12">
      <p className="py-2 px-1 my-1">Your Cart is empty</p>
      <EmptyCartIcon />
      <button
        className="bg-blue-500 text-white py-2  px-1 my-3"
        onClick={() => dispatch(cancel())}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
