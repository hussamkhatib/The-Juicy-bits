import { MapPinIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

import { getFirebase } from "../../src/firebase";
import { getUserCart } from "../../src/firebase/helper";
import { getUserDetails } from "../../src/firebase/user.firebase";
import { initOrder } from "../../src/redux/orderSlice";
import { initShippingAddress } from "../../src/redux/shippingAddressSlice";
import { openSlider } from "../../src/redux/sliderSlice";
import Authenticate from "../form/Authenticate";
import ProfileNavLink from "../Profile/ProfileNavLink";
import Nav from "./Nav";

const { auth } = getFirebase();

const Header = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  async function fetchCart() {
    const { total, products } = await getUserCart();

    const userDetails = await getUserDetails();
    const shippingAddress = userDetails.ShippingAddress;
    dispatch(initShippingAddress(shippingAddress));
    dispatch(
      initOrder({
        cart: products,
        total,
        shippingAddress: null,
      })
    );
  }

  useEffect(() => {
    if (user) {
      fetchCart();
    }
    //  'fetchCart' are intentionally not in the dependency list
    //  Cart is initially not rendered, we are just making it available beforehand to avoid a loading state later
  }, [user]);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <div className="container px-6 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <address className="hidden w-full text-gray-600 md:flex md:items-center">
            <MapPinIcon className="h-6 w-6" aria-hidden />
            <span className="mx-1 text-sm">BLR</span>
          </address>
          <h1>
            <Image src="/static/logo.png" alt="logo" height={192} width={518} />
          </h1>

          <div className="flex items-center justify-end w-full">
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
