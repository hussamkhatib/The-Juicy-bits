import { useDispatch } from "react-redux";

import { auth } from "../../src/firebase";
import { closeSlider, openSlider } from "../../src/redux/sliderSlice";
import { signOutUser } from "../../src/redux/userSlice";
import PrimaryProfileItems from "./PrimaryProfileItems";

const Profile = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(closeSlider());
    auth.signOut();
    dispatch(signOutUser());
  };

  return (
    <div>
      <PrimaryProfileItems />
      <hr className="my-3" />
      <button
        onClick={() => dispatch(openSlider("Edit Profile"))}
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

export default Profile;
