import React from "react";

import ProductCard from "./ProductCard";

function ProductsPage({ products }) {
  return (
    <div className="container mx-auto px-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
