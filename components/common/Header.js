import { MapPinIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { auth } from "../../src/firebase";
import { openSlider } from "../../src/redux/sliderSlice";
import Authenticate from "../form/Authenticate";
import ProfileNavLink from "../Profile/ProfileNavLink";
import Nav from "./Nav";
const Header = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <div className="container px-6 py-3 mx-auto">
        <div className="flex justify-between items-center  md:grid md:grid-cols-[1fr_auto_1fr] ">
          <address className="hidden w-full text-gray-600 md:flex md:items-center">
            <MapPinIcon className="h-6 w-6" aria-hidden />
            <span className="mx-1 text-sm">BLR</span>
          </address>
          <Link href="/">
            <a>
              <h1 className="font-bold text-lg md:text-2xl">The Juicy bits</h1>
            </a>
          </Link>

          <div className="flex items-center justify-end ">
            <div className="px-4">{user && <ProfileNavLink />}</div>
            {user ? null : <Authenticate />}

            <button
              onClick={() => dispatch(openSlider("Cart"))}
              className="px-4 text-xs text-gray-600 focus:outline-none"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden />
              Cart
            </button>
            <div className="flex sm:hidden">
              <button
                onClick={handleMenu}
                type="button"
                aria-label="toggle menu"
                className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              >
                <Bars3Icon className="h-6 w-6 fill-current" aria-hidden />
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
