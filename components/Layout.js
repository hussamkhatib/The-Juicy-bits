import { useState } from "react";
import Link from "next/link";
import Cart from './Cart/Cart'
import CartIcon from './Svg/CartIcon'
import Location from './Svg/Location'
import SearchIcon from './Svg/SearchIcon'
import Hamburger from './Svg/Hamburger'
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart,openOrClose } from './Cart/openCartSlice';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);
  
  const dispatch = useDispatch();
  const cartState = useSelector(openOrClose);

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
              <Location />
              <span className="mx-1 text-sm">BLR</span>
            </div>
            <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
              Evolution
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                onClick={()=> dispatch(toggleCart())}
                className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <CartIcon />
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
            <div className="flex flex-col sm:flex-row">
              <Link href="/">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  Home
                </a>
              </Link>
              <Link href="/products">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  Shop
                </a>
              </Link>
              <Link href="/categories">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  Categories
                </a>
              </Link>
              <Link href="/about">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  About
                </a>
              </Link>
            </div>
          </nav>
          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon />
            </span>

            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
      
      <Cart cartOpen={cartState} />
      
      <main className="my-8">{children}</main>
      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
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
  );
}


export default Layout;
