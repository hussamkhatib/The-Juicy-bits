import { Head, Html, Main, NextScript } from "next/document";

import { siteConfig } from "../components/common/Layout";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="icon" href="/icons/favicon.ico" />

        <meta name="application-name" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon-180x180.png"
        />
        <link rel="manifest" href="/site.manifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
