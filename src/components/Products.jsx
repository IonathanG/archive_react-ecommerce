import React from "react";
import { popularProducts } from "../data";
import Product from "./Product";

const Products = ({ type = "all", sortBy = "DEFAULT" }) => {
  return (
    <div className="products-container">
      {popularProducts
        .filter((item) => {
          if (type !== "all") return item.type === type;
          else return true;
        })
        .sort((a, b) => {
          if (sortBy.toUpperCase() === "DEFAULT") return b.id - a.id;
          else if (sortBy.toUpperCase() === "PRICE_UP")
            return a.price - b.price;
          else if (sortBy.toUpperCase() === "PRICE_DOWN")
            return b.price - a.price;
          else return null;
        })
        .map((item) => (
          <Product item={item} key={item.id} />
        ))}
    </div>
  );
};

export default Products;
