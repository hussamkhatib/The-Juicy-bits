import { HashtagIcon } from "@heroicons/react/24/solid";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Layout from "../../components/common/Layout";
import { auth } from "../../src/firebase";
import { getUserOrder } from "../../src/firebase/helper";
import { urlFor } from "../../utils/sanity";

const OrderPage = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (router.query.id && user) {
      setIsLoaded(false);
      (async () => {
        const data = await getUserOrder(router.query.id);
        if (!data) setError("Order not found");
        setData(data);
        setIsLoaded(true);
      })();
    }
  }, [router.query.id, user]);

  return (
    <Layout>
      {router?.query?.id ? (
        <div className="container mx-auto">
          {!isLoaded ? (
            <div>Loading</div>
          ) : error ? (
            <div>Error</div>
          ) : (
            <Fragment>
              <p className="text-2xl flex items-center underline">
                <HashtagIcon className="h-6 w-6 mr-1" aria-hidden />
                <span>{router.query.id}</span>
              </p>

              <h1 className="font-medium text-xl">Total: Rs{data.total}</h1>
              <p className="text-gray text-sm">
                Delivered on {data.orderCompletedAt}
                <br />
                to {data.shippingAddress.address}
              </p>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {data.products.map((product) => {
                  return (
                    <Link
                      href={`/products/${product.slug.current}`}
                      key={product.id}
                    >
                      <a className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div
                          className="flex items-end justify-end h-56 w-full bg-cover"
                          style={{
                            backgroundImage: `url('${urlFor(product.mainImage)
                              .auto("format")
                              .fit("crop")
                              .width(750)
                              .quality(80)}`,
                          }}
                        >
                          <div className="p-2 rounded  bg-blue-600 text-white mx-5 -mb-4">
                            {product.defaultProductVariant?.price *
                              product.count}
                          </div>
                        </div>
                        <div className="px-5 py-3">
                          <h3 className="text-gray-700 uppercase">
                            {product.title}
                          </h3>
                          <span className="text-gray-500 mt-2">
                            Rs {product.defaultProductVariant?.price}
                          </span>
                          <span className="ml-2 text-gray-500 mt-2">
                            Quantity {product.count}
                          </span>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </Fragment>
          )}
        </div>
      ) : (
        <Error statusCode={404} />
      )}
    </Layout>
  );
};

export default OrderPage;
