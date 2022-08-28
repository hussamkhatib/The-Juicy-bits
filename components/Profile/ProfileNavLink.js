import { UserIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

import { openSliderComponent } from "../../src/redux/sliderSlice";

const ProfileNavLink = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(openSliderComponent("profile"))}
      className="text-gray-600 flex flex-col items-center w-full "
    >
      <UserIcon className="h-6 w-6" aria-hidden />
      <div className="text-xs focus:outline-none sm:mx-0">Profile</div>
    </button>
  );
};

export default ProfileNavLink;
