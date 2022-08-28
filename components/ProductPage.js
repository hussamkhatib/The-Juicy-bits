/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { addProductId, auth } from "../firebase/config";
import { openSliderComponent } from "../redux/sliderSlice";
import { getClient, PortableText, urlFor } from "../utils/sanity";
import { addItem, selectItem } from "./Cart/cartSlice";
import CartIcon from "./Svg/CartIcon";

function ProductPage(props) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { title, defaultProductVariant, mainImage, body, id } = props;
  //console.log(props)
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItem);
  const cartTitles = cartItems.map((i) => i.title);

  useEffect(() => {
    if (cartTitles.includes(title)) {
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }
  }, [cartTitles, title]);

  const addToCart = () => {
    dispatch(addItem(props));
    // addProductId(auth.currentUser.uid, id);
    console.log("called");
  };

  function addOrMoveToCart() {
    if (!addedToCart) {
      return (
        <div className="mt-2">
          <button
            onClick={addToCart}
            className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          >
            Add to Cart <CartIcon />
          </button>
        </div>
      );
    } else {
      return (
        <>
          <div className="px-4">Item added</div>
          <button
            onClick={() => dispatch(openSliderComponent("Cart"))}
            className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          >
            Move to cart
          </button>
        </>
      );
    }
  }

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

          <div className="flex items-center mt-6">{addOrMoveToCart()}</div>
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
