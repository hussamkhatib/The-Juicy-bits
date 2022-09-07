import { UserIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

import { openSlider } from "../../src/redux/sliderSlice";
import Button from "../common/Button";

const ProfileNavLink = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className="flex flex-col items-center"
      onClick={() => dispatch(openSlider("Profile"))}
    >
      <UserIcon className="h-6 w-6" aria-hidden />
      <div className="text-xs focus:outline-none sm:mx-0">Profile</div>
    </Button>
  );
};

export default ProfileNavLink;
