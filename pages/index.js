import Error from "next/error";
import { useRouter } from "next/router";

import Layout from "../components/common/Layout";
import ProductsPage from "../components/ProductsPage";
import { getClient, usePreviewSubscription } from "../utils/sanity";

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`;

function IndexPage(props) {
  const { productsData, preview } = props;
  const router = useRouter();
  const { data: products } = usePreviewSubscription(query, {
    initialData: productsData,
    enabled: preview || router.query.preview !== null,
  });

  return (
    <Layout>
      {!router.isFallback && !productsData ? (
        <Error statusCode={404} />
      ) : (
        <div className="my-8">
          <div className="mt-4">
            <ProductsPage products={products} />
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {}, preview = false }) {
  const productsData = await getClient(preview).fetch(query);
  return {
    props: {
      preview,
      productsData,
    },
  };
}

export default IndexPage;
