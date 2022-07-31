import React, { useMemo } from "react";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

const Products = ({ type = "all", sortBy = "DEFAULT" }) => {
  const itemsData = useProducts();

  // useMemo to sort out and filter items
  // avoid uneccessary computing
  const productsDisplayed = useMemo(() => {
    return itemsData
      .filter((item) => {
        if (type !== "all") {
          console.log(item);
          return item.type === type;
        } else {
          return true;
        }
      })
      .sort((a, b) => {
        if (sortBy.toUpperCase() === "DEFAULT") {
          return b.id - a.id;
        } else if (sortBy.toUpperCase() === "PRICE_UP") {
          return a.price - b.price;
        } else if (sortBy.toUpperCase() === "PRICE_DOWN") {
          return b.price - a.price;
        } else {
          return null;
        }
      })
      .map((item) => <Product item={item} key={item.id} />);
  }, [type, sortBy, itemsData]);

  return <div className="products-container">{productsDisplayed}</div>;
};

export default Products;
