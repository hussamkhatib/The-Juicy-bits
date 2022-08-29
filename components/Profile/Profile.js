import { useSelector } from "react-redux";

import { userSelector } from "../../src/redux/userSlice";
import Cancel from "../Buttons/Cancel";
import ProfileItems from "./ProfileItems";

const Profile = () => {
  const user = useSelector(userSelector);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">
          Hello {user.displayName}
        </h3>
        <Cancel />
      </div>
      <hr className="my-3" />
      <ProfileItems />
    </>
  );
};

export default Profile;
