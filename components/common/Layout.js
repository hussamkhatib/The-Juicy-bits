import Head from "next/head";

import Header from "./Header";
import Slider from "./Slider";

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>The Juicy bits.</title>

        {/* Open Graph */}
        <meta
          property="og:site_name"
          content="The Juicy bits."
          key="ogsitename"
        />
        <meta property="og:title" content="Buy Juices online" key="ogtitle" />
        <meta
          property="og:description"
          content="We make juices.That's mostly it."
          key="ogdesc"
        />
      </Head>
      <div className="min-h-screen grid grid-rows-[max-content_auto_max-content] bg-white">
        <Header />

        <main>{children}</main>
        <Slider />
        <footer className="bg-gray-200">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <a
              href="#"
              className="text-xl font-bold text-gray-500 hover:text-gray-400"
            >
              The Juicy bits.
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
