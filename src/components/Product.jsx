import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import React from "react";

const Product = ({ item }) => {
  return (
    <div className="product-container">
      <div className="circle"></div>
      <img src={item.img} alt="" />
      <div className="info">
        <div className="icon">
          <ShoppingCartOutlined />
        </div>
        <div className="icon">
          <SearchOutlined />
        </div>
        <div className="icon">
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
