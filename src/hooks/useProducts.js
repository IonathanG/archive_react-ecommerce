import { useEffect, useState } from "react";
import Products from "../data.json";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(Products.popularProducts);
  }, []);

  return products;
};

export default useProducts;
