import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={` sm:flex sm:justify-center sm:items-center mt-4`}>
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
  );
};

export default Nav;
