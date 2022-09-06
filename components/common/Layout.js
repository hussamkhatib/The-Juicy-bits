import NextHead from "next/head";

import Footer from "./Footer";
import Header from "./Header";
import Slider from "./Slider";

export const siteConfig = {
  name: "The Juicy bits",
  description: "We make juices.That's mostly it.",
  url: "https://thejuicybits.vercel.app",
  image:
    "https://cdn.sanity.io/images/wltlles4/production/195dd96b2e7239968d4f08f882bb8e317e0b787b-3646x5274.jpg?w=1051&q=80&fit=crop&auto=format",
};

const Head = ({
  title = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  image = siteConfig.image,
}) => {
  return (
    <NextHead>
      {/* Title and Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="title" content={title} />

      {/* Essentials */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* General */}
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="author" content="Hussam Khatib" />
      <meta name="description" content={description} />
      <meta property="apple-mobile-web-app-title" content={title} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* og Image */}
      <meta property="og:image" content={image} />
    </NextHead>
  );
};

function Layout({ children, ...seoProps }) {
  return (
    <>
      <Head {...seoProps} />
      <div className="min-h-screen grid grid-rows-[max-content_auto_max-content] bg-white">
        <Header />
        <main>{children}</main>
        <Slider />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
