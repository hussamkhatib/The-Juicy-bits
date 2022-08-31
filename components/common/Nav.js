import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/products",
  },
  {
    name: "About",
    href: "/about",
  },
];

const Nav = () => {
  const router = useRouter();

  return (
    <nav className="sm:flex sm:justify-center sm:items-center mt-4">
      <ul className="flex flex-col sm:flex-row">
        {routes.map((route) => {
          const isCurrent = router.asPath === route.href;
          return (
            <Link key={route.name} href={route.href}>
              <a
                className={classNames(
                  isCurrent ? "text-blue-500" : "text-gray-600",
                  "mt-3 hover:underline sm:mx-3 sm:mt-0"
                )}
              >
                {route.name}
              </a>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
