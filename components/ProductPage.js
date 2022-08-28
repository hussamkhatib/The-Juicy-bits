/* eslint-disable @next/next/no-img-element */
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

import { getFirebase } from "../src/firebase";
import { addProductToCartFB } from "../src/firebase/helper";
import { addProductToCart } from "../src/redux/cartSlice";
import { openSliderComponent } from "../src/redux/sliderSlice";
import { PortableText, urlFor } from "../utils/sanity";

const { firestore, auth } = getFirebase();

function ProductPage(props) {
  const { title, defaultProductVariant, mainImage, body } = props;
  const [user, isloading, error] = useAuthState(auth);

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={urlFor(mainImage)
              .auto("format")
              .width(1051)
              .fit("crop")
              .quality(80)}
            alt={mainImage?.alt || `Photo of ${title}`}
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">{title}</h3>
          <span className="text-gray-500 mt-3">
            Rs {defaultProductVariant?.price}
          </span>
          <hr className="my-3" />

          <div className="flex items-center mt-6">
            {user?.uid ? <CTA props={props} useruid={user.uid} /> : null}
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Description</h3>
        {body && <PortableText blocks={body?.en} className="text-gray-600" />}
      </div>
    </div>
  );
}

export default ProductPage;

const CTA = ({ props, useruid }) => {
  const dispatch = useDispatch();
  const [value, loading, error] = useDocument(
    doc(firestore, "users", useruid, "cart", props.id)
  );
  const addToCart = () => {
    dispatch(addProductToCart(props));
    addProductToCartFB(props.id);
  };

  // TODO LOADING AND ERROR
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return value?.exists() ? (
    <>
      <div className="px-4">Item added</div>
      <button
        onClick={() => dispatch(openSliderComponent("Cart"))}
        className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
      >
        Move to cart
      </button>
    </>
  ) : (
    <div className="mt-2">
      <button
        onClick={() => addToCart()}
        className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
      >
        Add to Cart
        <ShoppingCartIcon className="h-5 w-5 ml-2" aria-hidden />
      </button>
    </div>
  );
};
