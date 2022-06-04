import React from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import { NavLink } from "react-router-dom";

const Products = () => {
  return (
    <div className="products-container">
      {popularProducts.map((item) => (
        <NavLink to={`/product/${item.id}`} key={item.id}>
          <Product item={item} key={item.id} />
        </NavLink>
      ))}
    </div>
  );
};

export default Products;
