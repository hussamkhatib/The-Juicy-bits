import Cancel from "./Buttons/Cancel";
import GoBack from "./Buttons/GoBack";

const SliderHeader = (props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <GoBack />
        <h3 className="text-2xl font-medium text-gray-700">
          {props.Component}
        </h3>
        <Cancel />
      </div>
      <hr className="my-3" />
    </>
  );
};

export default SliderHeader;
