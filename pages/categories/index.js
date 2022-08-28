import Error from "next/error";
import { useRouter } from "next/router";

import CategoriesPage from "../../components/Category/CategoriesPage";
import { getClient, usePreviewSubscription } from "../../utils/sanity";

const query = `*[_type == 'category' && defined(slug.current)]{
  title,
 'id':*[defined(categories) && _type == 'product' && references(^._id)][0]{
 _id
}
}[defined(id)]`;

function CategoriesPageContainer({ categoriesData, preview }) {
  const router = useRouter();
  if (!router.isFallback && !categoriesData) {
    return <Error statusCode={404} />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: categories } = usePreviewSubscription(query, {
    initialData: categoriesData,
    enabled: preview || router.query.preview !== null,
  });

  return <CategoriesPage categories={categories} />;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const categoriesData = await getClient(preview).fetch(query);

  return {
    props: { preview, categoriesData },
  };
}

export default CategoriesPageContainer;
