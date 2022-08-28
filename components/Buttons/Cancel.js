import { useDispatch } from "react-redux";

import { cancel } from "../../redux/sliderSlice";
import CancelIcon from "../Svg/CancelIcon";

const Cancel = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(cancel())}
      className="text-gray-600 focus:outline-none"
    >
      <CancelIcon />
    </button>
  );
};

export default Cancel;
