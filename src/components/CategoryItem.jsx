import React from "react";
import { NavLink } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryItem-container">
      <img src={item.img} alt="" />
      <div className="info">
        <h1 className="title">{item.title}</h1>
        <NavLink to="/product-list" className="">
          <button>SHOP NOW</button>
        </NavLink>
      </div>
    </div>
  );
};

export default CategoryItem;
