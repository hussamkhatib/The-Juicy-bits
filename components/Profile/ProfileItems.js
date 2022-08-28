import { useDispatch } from "react-redux";

import { openSliderComponent } from "../../redux/sliderSlice";
import { cancel } from "../../redux/sliderSlice";
import { signOutUser } from "../../redux/userSlice";
import { getFirebase } from "../../src/firebase";
import PrimaryProfileItems from "./PrimaryProfileItems";
const { auth } = getFirebase();

const ProfileItems = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(cancel());
    auth.signOut();
    dispatch(signOutUser());
  };

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
        onClick={logOut}
        className="w-full text-left hover:bg-gray-200 py-1"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileItems;
