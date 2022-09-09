import Error from "next/error";
import { useRouter } from "next/router";
import { groq } from "next-sanity";

import Layout from "../../components/common/Layout";
import ProductPage from "../../components/ProductPage";
import { getClient, urlFor, usePreviewSubscription } from "../../utils/sanity";

const query = groq`*[_type == "product" && slug.current == $slug][0]`;

function ProductPageContainer({ productData, preview }) {
  const router = useRouter();

  const { data: product = {} } = usePreviewSubscription(query, {
    params: { slug: productData?.slug?.current },
    initialData: productData,
    enabled: preview || router.query.preview !== null,
  });

  if (!router.isFallback && !productData?.slug)
    return (
      <Layout>
        <Error statusCode={404} />;
      </Layout>
    );

  const {
    _id,
    title,
    defaultProductVariant,
    mainImage,
    blurb,
    body,
    tags,
    vendor,
    slug,
  } = product;
  return (
    <Layout
      image={urlFor(mainImage)}
      description={blurb?.en || null}
      title={title}
    >
      <ProductPage
        _id={_id}
        title={title}
        defaultProductVariant={defaultProductVariant}
        mainImage={mainImage}
        blurb={blurb}
        body={body}
        tags={tags}
        vendor={vendor}
        slug={slug?.current}
      />
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const productData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  return {
    props: { preview, productData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default ProductPageContainer;
