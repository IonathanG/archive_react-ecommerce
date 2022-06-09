import React, { useState } from "react";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { popularProducts } from "../data";
import { useDispatch } from "react-redux";
import { addItem } from "../feature/cartSlice";
import { NavLink } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const {
    name: product_name,
    price: product_price,
    img: product_img,
    desc: product_desc,
  } = popularProducts[id];

  const sizeOptions = [
    { value: "XS", text: "XS" },
    { value: "S", text: "S" },
    { value: "M", text: "M" },
    { value: "L", text: "L" },
    { value: "XL", text: "XL" },
  ];

  const dispatch = useDispatch();
  const [sizeSelected, setSizeSelected] = useState(sizeOptions[0].value);
  const [colorSelected, setColorSelected] = useState("black");
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantity = (option) => {
    if (option === "remove") {
      if (itemQuantity > 1) setItemQuantity((prevState) => prevState - 1);
    } else if (option === "add")
      if (itemQuantity < 9) setItemQuantity((prevState) => prevState + 1);
  };

  const handleSize = (e) => {
    setSizeSelected(e.target.value);
  };

  const handleColor = (option) => {
    setColorSelected(option);
    console.log(colorSelected);
  };

  return (
    <div className="page-product-container">
      <NavLink to="/product-list">
        <button className="topButton">CONTINUE SHOPPING</button>
      </NavLink>
      <div className="wrapper">
        <div className="img-container">
          <img src={product_img} alt="picture_of_item" />
        </div>
        <div className="info-container">
          <h1>{product_name}</h1>
          <p className="description">{product_desc}</p>
          <span className="price">$ {product_price}</span>
          <div className="product-filter-container">
            <div className="filter">
              <div className="filter-title">Color</div>
              <div
                className={`filter-color black ${
                  colorSelected === "black" ? "filter-selected" : ""
                }`}
                value="black"
                onClick={() => handleColor("black")}
              ></div>
              <div
                className={`filter-color darkblue ${
                  colorSelected === "darkblue" ? "filter-selected" : ""
                }`}
                value="darkblue"
                onClick={() => handleColor("darkblue")}
              ></div>
              <div
                className={`filter-color gray ${
                  colorSelected === "gray" ? "filter-selected" : ""
                }`}
                value="gray"
                onClick={() => handleColor("gray")}
              ></div>
            </div>
            <div className="filter">
              <div className="filter-title">Size</div>
              <select
                className="filter-size"
                value={sizeSelected}
                onChange={handleSize}
              >
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-container">
            <div className="amount-container">
              <span
                className="setAmount"
                onClick={() => handleQuantity("remove")}
              >
                <Remove />
              </span>
              <span className="amount">{itemQuantity}</span>
              <span className="setAmount" onClick={() => handleQuantity("add")}>
                <Add />
              </span>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    name: product_name,
                    price: product_price,
                    img: product_img,
                    quantity: itemQuantity,
                    color: colorSelected,
                    size: sizeSelected,
                    id,
                    //ref,
                  })
                )
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductPage;
