import { useDispatch } from "react-redux";

import { openSlider } from "../../src/redux/sliderSlice";

const mainItems = ["Your Orders", "Cart", "Contact us"];
const PrimaryProfileItems = () => {
  const dispatch = useDispatch();

  return (
    <>
      {mainItems.map((item) => (
        <button
          key={item}
          onClick={() => dispatch(openSlider(item))}
          className="w-full hover:bg-gray-200 py-1 block text-left"
        >
          {item}
        </button>
      ))}
    </>
  );
};

export default PrimaryProfileItems;
