import { useSelector } from "react-redux";

import { openOrClose } from "../redux/sliderSlice";

const SliderContainer = ({ children }) => {
  const openOrCloseSlider = useSelector(openOrClose);
  return (
    <div
      className={`${
        openOrCloseSlider
          ? "translate-x-0 ease-out"
          : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 overflow-y-auto bg-white border-l-2 border-gray-300`}
    >
      {children}
    </div>
  );
};

export default SliderContainer;
