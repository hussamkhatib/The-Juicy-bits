import { useDispatch } from "react-redux";

import { openSliderComponent } from "../../src/redux/sliderSlice";
import Back from "../Svg/Back";

const GoBack = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(openSliderComponent("profile"))}
      className="text-gray-600 focus:outline-none"
    >
      <Back />
    </button>
  );
};

export default GoBack;
