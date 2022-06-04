import React from "react";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const ProductList = () => {
  return (
    <div className="productList-container">
      <h1>Experience Style</h1>
      <div className="filter-container">
        <div className="filter">
          <span>Filter Products:</span>
          <select defaultValue={"DEFAULT"} style={{ size: "15" }}>
            <option value="DEFAULT" disabled>
              Color
            </option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
              Size
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="filter">
          <span>Sort Products:</span>
          <select defaultValue={"DEFAULT"}>
            <option value="DEFAULT">Newest</option>
            <option>Price (asc)</option>
            <option>Price (desc)</option>
          </select>
        </div>
      </div>
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
