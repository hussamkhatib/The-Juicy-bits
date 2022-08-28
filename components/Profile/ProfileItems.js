import PrimaryProfileItems from "./PrimaryProfileItems";
import { openSliderComponent } from "../../redux/sliderSlice";
import { useDispatch } from "react-redux";

const ProfileItems = () => {
  const dispatch = useDispatch();
  // const logOut = () => {
  //   dispatch(cancel());
  //   auth.signOut();
  //   dispatch(setInitiial());
  // };
  return (
    <div>
      <PrimaryProfileItems />
      <hr className="my-3" />
      <button
        onClick={() => dispatch(openSliderComponent("Edit Profile"))}
        className="w-full hover:bg-gray-200 py-1 block text-left"
      >
        Edit Profile
      </button>
      <button
        // onClick={Logout}
        className="w-full text-left hover:bg-gray-200 py-1"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileItems;
