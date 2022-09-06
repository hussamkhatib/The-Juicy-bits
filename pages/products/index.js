import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../../components/common/Layout";
import LoadingProductCard from "../../components/LoadingProductCard";
import ProductsPage from "../../components/ProductsPage";
import { getClient } from "../../utils/sanity";
const query = `//groq
  *[_type == "product" && defined(slug.current)]`;

const queryWithFilters = (tag, search) => `//groq
  *[_type == "product" && defined(slug.current ) ${
    tag ? `&& "${tag}" in tags` : ""
  }
  ${search ? `&& title match "${search}*"` : ""}
]`;

const tags = ["kombucha", "drink", "ritual", "lowcal", "nice", "milky"];

async function fetchProducts(tags, search) {
  const query = queryWithFilters(tags, search);
  const res = await getClient().fetch(query);
  return res;
}

function ProductsPageContainer({ productsData }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState(productsData);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    tag: null,
    search: "",
  });

  useEffect(() => {
    if (filters.search || filters.tag) {
      setIsLoaded(false);
      fetchProducts(filters.tag, filters.search).then(
        (result) => {
          setError(null);
          setData(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
    }
  }, [filters.search, filters.tag]);

  const router = useRouter();

  return (
    <Layout>
      {!router.isFallback && !productsData ? (
        <Error statusCode={404} />
      ) : (
        <div className="container mx-auto">
          <div className="pt-2  px-6   text-gray-600 relative ">
            <div className="absolute h-12 pl-2 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden />
            </div>
            <input
              onChange={(event) =>
                setFilters({ ...filters, search: event.target.value })
              }
              value={filters.search}
              className="border-2 border-gray-300 pl-10 rounded-lg bg-white h-12 pr-5 text-sm focus:outline-none w-full"
              type="search"
              placeholder="Search"
            />
          </div>
          <div className="my-5 px-6 flex gap-2 items-center">
            <h2 className="text-lg">Try:</h2>
            {tags.map((tag) => (
              <button
                onClick={() => setFilters({ ...filters, tag })}
                className={classNames(
                  filters.tag == tag ? "bg-blue-500 text-white" : "bg-gray-100",
                  "border-2  rounded-lg p-[0.4em_0.5em]  focus:border-blue-500 border-gray-300"
                )}
                key={tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {error ? (
            <p>Something went wrong!</p>
          ) : !isLoaded ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </div>
          ) : data.length ? (
            <ProductsPage products={data} />
          ) : (
            <>
              <p className="uppercase px-6 text-xl font-medium">
                NO RESULTS FOR {filters.search}{" "}
                {filters.tag && `with tag ${filters.tag}`}.
              </p>
              <p className="px-6">Try a different search</p>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {}, preview = false }) {
  const productsData = await getClient(preview).fetch(query);

  return {
    props: { preview, productsData },
  };
}

export default ProductsPageContainer;
