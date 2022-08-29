import { XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

import { cancel } from "../../src/redux/sliderSlice";

const Cancel = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(cancel())}
      className="text-gray-600 focus:outline-none"
    >
      <XCircleIcon className="w-5 h-5" aria-hidden />
    </button>
  );
};

export default Cancel;
