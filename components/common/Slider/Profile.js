import { useDispatch } from "react-redux";

import { auth } from "../../../src/firebase";
import { closeSlider, openSlider } from "../../../src/redux/sliderSlice";
import { signOutUser } from "../../../src/redux/userSlice";
import Button from "../Button";

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
      <Button onClick={logOut} className="w-full text-left my-0">
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;

const mainItems = ["Your Orders", "Cart"];

const PrimaryProfileItems = () => {
  const dispatch = useDispatch();

  return (
    <>
      {mainItems.map((item) => (
        <Button
          key={item}
          onClick={() => dispatch(openSlider(item))}
          className="w-full text-left my-0"
        >
          {item}
        </Button>
      ))}
    </>
  );
};
