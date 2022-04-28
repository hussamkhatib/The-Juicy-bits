import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getClient } from "../utils/sanity";
import { auth, getUserDetails } from "../firebase/config";
import Image from "next/image";
import Head from "next/head";

import SignupContainer from "./Form/SignupContainer";
import ProfileNavLink from "./Profile/ProfileNavLink";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
import SliderContainer from "./SliderContainer";
import Order from "./Orders/Order";
import CartIcon from "./Svg/CartIcon";
import Location from "./Svg/Location";
import Hamburger from "./Svg/Hamburger";

import { useSelector, useDispatch } from "react-redux";
import { addItem, setInitiial } from "./Cart/cartSlice";
import { userLoggedState, LogInUser, LogOutUser } from "../redux/userSlice";
import { cancel } from "../redux/sliderSlice";
import { toggleForm, openOrCloseFormComponent } from "../redux/formSlice";
import {
  openSliderComponentState,
  openSliderComponent,
} from "../redux/sliderSlice";
import ContactUs from "./ContactUs";
import EditProfile from "./Profile/EditProfile";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);
  const sliderState = useSelector(openSliderComponentState);
  const renderForm = useSelector(openOrCloseFormComponent);
  const userAuthState = useSelector(userLoggedState);

  const logOut = () => {
    dispatch(cancel());
    auth.signOut();
    dispatch(setInitiial());
  };
  async function onAuthStateChange() {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(toggleForm(true));
        const userDetails = await getUserDetails(auth.currentUser.uid);
        if (userDetails) {
          dispatch(
            LogInUser([
              user.displayName,
              userDetails.mobileNumber,
              userDetails.location,
              userDetails.pincode,
            ])
          );
          const { products } = userDetails;
          if (products != []) {
            const query = `*[_type == "product" && _id in 
            [
              ${products.map((i) => `'${i}'`).join(",")}
              ]
            ]
            `;
            const cartData = [];
            await getClient()
              .fetch(query)
              .then((product) => {
                product.forEach((pro) => {
                  cartData.push(pro);
                  dispatch(addItem(pro));
                });
              });
          }
        }
      } else {
        dispatch(LogOutUser());
      }
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fullUrl = router.pathname;
  const slashIndex = fullUrl.slice(1).indexOf("/");
  const mainUrl =
    fullUrl === "/"
      ? "Home"
      : slashIndex === -1
      ? fullUrl.slice(1)
      : fullUrl.slice(0, slashIndex).slice(1);
  const renderTitle = `${mainUrl[0].toUpperCase()}${mainUrl.slice(
    1
  )} | Evolutiongifts`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{renderTitle}</title>

        {/* Open Graph */}
        <meta property="og:image" content={"/static/logo.png"} key="ogimage" />
        <meta
          property="og:site_name"
          content="Evolution Gifts"
          key="ogsitename"
        />
        <meta
          property="og:title"
          content="Online Shopping India - Shop online gifts"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Online Shopping site for gifts in India"
          key="ogdesc"
        />
      </Head>
      <div className="bg-white">
        <header>
          <div className="container px-6 py-3 mx-auto">
            <div className="flex items-center justify-between">
              <address className="hidden w-full text-gray-600 md:flex md:items-center">
                <Location />
                <span className="mx-1 text-sm">BLR</span>
              </address>
              <h1 className="hidden w-full text-2xl font-semibold text-gray-700 md:text-center">
                Evolution
              </h1>
              <Image
                src="/static/logo.png"
                alt="logo"
                height={192}
                width={518}
              />
              <div className="flex items-center justify-end w-full">
                <div className="px-4">
                  {userAuthState.logIn && <ProfileNavLink />}
                </div>
                {!userAuthState.logIn && (
                  <button
                    className="p-2 text-white bg-blue-500 hover:bg-blue-300"
                    onClick={() => dispatch(toggleForm())}
                  >
                    Sign Up
                  </button>
                )}
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
            <nav
              className={`${
                menuOpen ? "" : "hidden"
              } sm:flex sm:justify-center sm:items-center mt-4`}
            >
              <ul className="flex flex-col sm:flex-row">
                <Link href="/">
                  <a
                    className={
                      router.pathname == "/"
                        ? "mt-3 text-blue-500 hover:underline sm:mx-3 sm:mt-0"
                        : "mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                    }
                  >
                    Home
                  </a>
                </Link>
                <Link href="/products">
                  <a
                    className={
                      router.pathname.startsWith("/products")
                        ? "mt-3 text-blue-500 hover:underline sm:mx-3 sm:mt-0"
                        : "mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                    }
                  >
                    Shop
                  </a>
                </Link>
                <Link href="/categories">
                  <a
                    className={
                      router.pathname.startsWith("/categories")
                        ? "mt-3 text-blue-500 hover:underline sm:mx-3 sm:mt-0"
                        : "mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                    }
                  >
                    Categories
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    className={
                      router.pathname == "/[slug]"
                        ? "mt-3 text-blue-500 hover:underline sm:mx-3 sm:mt-0"
                        : "mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                    }
                  >
                    About
                  </a>
                </Link>
              </ul>
            </nav>
          </div>
        </header>

        <SliderContainer>
          {sliderState === "Cart" && <Cart />}
          {sliderState === "profile" && <Profile Logout={logOut} />}
          {sliderState === "Your Orders" && <Order />}
          {sliderState === "Contact us" && <ContactUs />}
          {sliderState === "Edit Profile" && <EditProfile />}
        </SliderContainer>

        <main className="my-8">{children}</main>
        {renderForm && (
          <>
            <SignupContainer />
            <div className="fixed inset-0 overflow-y-auto bg-black opacity-66"></div>
          </>
        )}

        <footer className="bg-gray-200">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <a
              href="#"
              className="text-xl font-bold text-gray-500 hover:text-gray-400"
            >
              Evolution.
            </a>
            <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
