import { useSelector } from "react-redux";
import ProfileItems from "./ProfileItems";
import { userLoggedState } from "../../redux/userSlice";
import Cancel from "../Buttons/Cancel";

const Profile = ({ Logout }) => {
  const { name } = useSelector(userLoggedState);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">
          Hello {name && name}
        </h3>
        <Cancel />
      </div>
      <hr className="my-3" />
      <ProfileItems Logout={Logout} />
    </>
  );
};

export default Profile;
