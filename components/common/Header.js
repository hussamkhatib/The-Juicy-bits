import React, { useState, useEffect } from "react";
import Location from "../Svg/Location";
import Image from "next/image";
import Authenticate from "../Form/Authenticate";
import CartIcon from "../Svg/CartIcon";
import Hamburger from "../Svg/Hamburger";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { openSliderComponent } from "../../redux/sliderSlice";
import ProfileNavLink from "../Profile/ProfileNavLink";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebase } from "../../src/firebase";
import { getUser } from "../../src/firebase/util";

const { auth } = getFirebase();

const Header = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log(getUser(user));
    }
  }, [user]);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <div className="container px-6 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <address className="hidden w-full text-gray-600 md:flex md:items-center">
            <Location />
            <span className="mx-1 text-sm">BLR</span>
          </address>
          <h1>
            <Image src="/static/logo.png" alt="logo" height={192} width={518} />
          </h1>

          <div className="flex items-center justify-end w-full">
            <div className="px-4">{user && <ProfileNavLink />}</div>
            {user ? null : <Authenticate />}

            <button
              onClick={() => dispatch(openSliderComponent("Cart"))}
              className="px-4 text-xs text-gray-600 focus:outline-none"
            >
              <CartIcon />
              Cart
            </button>
            <div className="flex sm:hidden">
              <button
                onClick={handleMenu}
                type="button"
                aria-label="toggle menu"
                className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                <Hamburger />
              </button>
            </div>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
