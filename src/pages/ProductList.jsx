import React, { useState } from "react";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const ProductList = () => {
  const typeOptions = [
    { value: "all", text: "All" },
    { value: "t-shirt", text: "T-Shirt" },
    { value: "shirt", text: "Shirt" },
    { value: "dress", text: "Dress" },
    { value: "coat", text: "Coat" },
    { value: "bag", text: "Bag" },
    { value: "hat", text: "Hat" },
  ];

  const sizeOptions = [
    { value: "XS", text: "XS" },
    { value: "S", text: "S" },
    { value: "M", text: "M" },
    { value: "L", text: "L" },
    { value: "XL", text: "XL" },
  ];

  const [typeSelected, setTypeSelected] = useState("all");
  const [sortBySelected, setSortBySelected] = useState("default");

  return (
    <div className="productList-container">
      <h1>Experience Style</h1>
      <div className="filter-container">
        <div className="filter">
          <span>Filter Products:</span>
          <select
            defaultValue={"DEFAULT"}
            style={{ size: "15" }}
            onChange={(e) => setTypeSelected(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Type
            </option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <select defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
              Size
            </option>
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <span>Sort Products:</span>
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => setSortBySelected(e.target.value)}
          >
            <option value="DEFAULT">Newest</option>
            <option value={"price_up"}>Price (asc)</option>
            <option value={"price_down"}>Price (desc)</option>
          </select>
        </div>
      </div>
      <Products type={typeSelected} sortBy={sortBySelected} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
