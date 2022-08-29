import Head from "next/head";
import { useRouter } from "next/router";

import Header from "./Header";
import Slider from "./Slider";

function Layout({ children }) {
  const router = useRouter();

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
      <div className="min-h-screen grid grid-rows-[auto_auto_max-content] bg-white">
        <Header />

        <main className="my-8">{children}</main>
        <Slider />
        <footer className="bg-gray-200">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <a
              href="#"
              className="text-xl font-bold text-gray-500 hover:text-gray-400"
            >
              Evolution.
            </a>
            <small className="text-sm py-2 text-gray-500 sm:py-0">
              All rights reserved
            </small>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
