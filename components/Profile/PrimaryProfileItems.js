import { useDispatch } from "react-redux";
import { openSliderComponent } from "../../redux/sliderSlice";

const PrimaryProfileItems = () => {
  const dispatch = useDispatch();
  const mainItems = ["Your Orders", "Cart", "Contact us"];

  return (
    <>
      {mainItems.map((item) => (
        <button
          key={item}
          onClick={() => dispatch(openSliderComponent(item))}
          className="w-full hover:bg-gray-200 py-1 block text-left text-left"
        >
          {item}
        </button>
      ))}
    </>
  );
};

export default PrimaryProfileItems;
