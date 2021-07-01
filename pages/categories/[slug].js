import Error from "next/error";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../../utils/sanity";
import CategoryPage from "../../components/Category/CategoryPage";

const query = groq`*[_type == "category"  && slug.current == $slug][0]{
	slug,title,_id,
  "products":*[_type == "product" && references(^._id)] 
}`;

function CategoryContainer({ categoryData, preview }) {
  const router = useRouter();
  if (!router.isFallback && !categoryData?.slug) {
    return <Error statusCode={404} />;
  }

  const { data: category = {} } = usePreviewSubscription(query, {
    params: { slug: categoryData?.slug?.current },
    initialData: categoryData,
    enabled: preview || router.query.preview !== null,
  });

  const { _id, title, slug, products } = category;
  return (
    <CategoryPage
      id={_id}
      title={title}
      slug={slug?.current}
      products={products}
    />
  );
}

export async function getStaticProps({ params, preview = false }) {
  const categoryData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  return {
    props: { preview, categoryData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "category" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default CategoryContainer;
