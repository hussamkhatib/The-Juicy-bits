import { groq } from "next-sanity";
import React from "react";

import Layout, { siteConfig } from "../components/common/Layout";
import LandingPage from "../components/LandingPage";
import { getClient } from "../utils/sanity";

const query = groq`*[_type == "route" && slug.current == $slug][0]{
    page->
  }`;

const AboutPage = ({ page }) => {
  return (
    <Layout title={`${siteConfig.name} | About`}>
      <LandingPage page={page} />
    </Layout>
  );
};

export default AboutPage;

export async function getStaticProps() {
  const { page } = await getClient().fetch(query, {
    slug: "about",
  });
  return {
    props: { page },
  };
}
