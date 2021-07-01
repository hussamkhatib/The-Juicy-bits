import React from "react";
import ProductCard from "../ProductCard";

const CategoryPage = ({ slug, title, id, products }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </div>
  );
};

export default CategoryPage;
