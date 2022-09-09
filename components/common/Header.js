import { MapPinIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { auth } from "../../src/firebase";
import { openSlider } from "../../src/redux/sliderSlice";
import Authenticate from "../form/Authenticate";
import Button from "./Button";
import Nav from "./Nav";

const Header = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  return (
    <header>
      <div className="container px-2 md:px-6 py-1 md:py-3 mx-auto">
        <div className="flex justify-between items-center  md:grid md:grid-cols-[1fr_auto_1fr] ">
          <address className="hidden w-full text-gray-600 md:flex md:items-center">
            <MapPinIcon className="h-6 w-6" aria-hidden />
            <span className="mx-1 text-sm">BLR</span>
          </address>
          <Link href="/">
            <a>
              <h1 className="font-medium text-lg md:text-2xl">
                The Juicy bits
              </h1>
            </a>
          </Link>

          <div className="flex items-center justify-end gap-4">
            {user && (
              <Button
                className="flex flex-col items-center my-0"
                padding="p-0"
                onClick={() => dispatch(openSlider("Profile"))}
              >
                <UserIcon className="h-6 w-6" aria-hidden />
                <div className="text-xs focus:outline-none sm:mx-0">
                  Profile
                </div>
              </Button>
            )}
            {user ? null : <Authenticate />}
            <Button
              onClick={() => dispatch(openSlider("Cart"))}
              padding="p-0"
              className="text-xs my-0"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden />
              <div className="text-xs focus:outline-none sm:mx-0">Cart</div>
            </Button>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
