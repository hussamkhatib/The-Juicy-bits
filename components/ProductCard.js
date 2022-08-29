import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { urlFor } from "../utils/sanity";
import CartIcon from "./Svg/CartIcon";

function ProductCard({ _id, title, mainImage, slug, defaultProductVariant }) {
  return (
    <Link href={`/products/${slug.current}`}>
      <a className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <div
          className="flex items-end justify-end h-56 w-full bg-cover"
          style={{
            backgroundImage: `url('${urlFor(mainImage)
              .auto("format")
              .fit("crop")
              .width(750)
              .quality(80)}`,
          }}
        >
          <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            <ShoppingCartIcon className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 uppercase">{title}</h3>
          <span className="text-gray-500 mt-2">
            Rs {defaultProductVariant?.price}
          </span>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;
