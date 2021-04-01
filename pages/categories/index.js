import Error from "next/error";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../../utils/sanity";
import CategoriesPage from '../../components/Category/CategoriesPage'

/*const query = `*[_type == "category" && defined(slug.current)]{
  title
}`;*/
const query = `*[_type == 'category' && defined(slug.current)]{
  title,
 'id':*[defined(categories) && _type == 'product' && references(^._id)][0]{
 _id
}
}`

function CategoriesPageContainer({ categoriesData, preview }) {
  const router = useRouter();
  if (!router.isFallback && !categoriesData) {
    return <Error statusCode={404} />;
  }
  
  const { data: categories } = usePreviewSubscription(query, {
    initialData: categoriesData,
    enabled: preview || router.query.preview !== null,
  });

  return <CategoriesPage categories={categories}/>;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const categoriesData = await getClient(preview).fetch(query);

  return {
    props: { preview, categoriesData },
  };
}

export default CategoriesPageContainer;
