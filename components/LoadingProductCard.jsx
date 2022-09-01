import React from "react";

const LoadingProductCard = () => {
  return (
    <div className="bg-gray-300 animate-pulse  w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <div className="flex items-end justify-end h-56 w-full bg-cover"></div>
      <div className="text-transparent px-5 py-3 bg-white">
        <h3 className="bg-gray-300 w-max">Loading Title</h3>
        <span className="bg-gray-300 mt-2">Rs XXX</span>
      </div>
    </div>
  );
};

export default LoadingProductCard;
