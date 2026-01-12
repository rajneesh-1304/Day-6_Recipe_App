import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductItem } from "../types";

export const FromScratch = ({
  products,
  fetchData,
  loading,
  error
}: {
  products: ProductItem[];
  fetchData: (page: number) => Promise;
  loading: boolean;
  error: null|Error
}) => {
  const [page, setPage] = useState(1);
  
  // scroll logic  

  return (
    <div>
      <div className="products-list">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};