import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import {
  addQuantity,
  removeQuantity,
  removeItem,
  deleteCart,
} from "../feature/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const listItems = useSelector((state) => state.cart.listItems);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(listItems);
  }, [listItems]);

  return (
    <div className="cart-container">
      <div className="wrapper">
        <h1>YOUR BAG</h1>
        <div className="top">
          <NavLink to="/product-list" className="">
            <button className="topButton transparent">CONTINUE SHOPPING</button>
          </NavLink>
          <div className="topTexts">
            <span className="topText">Shopping Bag (2)</span>
            <span className="topText">Your Wishlist (0)</span>
          </div>
          <button className="topButton filled">CHECKOUT NOW</button>
        </div>
        <div className="bottom">
          <div className="info">
            <div className="product">
              <div className="product-detail">
                <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1-index-white-sneakers-1629830273.jpg?crop=0.373xw:0.746xh;0.309xw,0.173xh&resize=640:*"
                  alt=""
                />
                <div className="details">
                  <span className="product-name">
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </span>
                  <span className="product-id">
                    <b>REF:</b> 123456789
                  </span>
                  <div
                    className="product-color"
                    style={{ backgroundColor: "black" }}
                  ></div>
                  <span className="product-size">
                    <b>Size:</b> 37.5
                  </span>
                </div>
              </div>
              <div className="price-detail">
                <div className="product-amount-container">
                  <Add />
                  <div className="product-amount">2</div>
                  <Remove />
                </div>
                <div className="product-price">$ 30</div>
              </div>
            </div>
            <hr className="hr" />
            <div className="product">
              <div className="product-detail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKnWslSXJWBq1kXC19gDguxmN4eEqd3Jfag82xtAP784HZsD_inQoSnYkfqHBPCpxhrE&usqp=CAU"
                  alt=""
                />
                <div className="details">
                  <span className="product-name">
                    <b>Product:</b> HAKURA THUNDER SHOES
                  </span>
                  <span className="product-id">
                    <b>REF:</b> 987654321
                  </span>
                  <div
                    className="product-color"
                    style={{ backgroundColor: "black" }}
                  ></div>
                  <span className="product-size">
                    <b>Size:</b> M
                  </span>
                </div>
              </div>
              <div className="price-detail">
                <div className="product-amount-container">
                  <Add />
                  <div className="product-amount">2</div>
                  <Remove />
                </div>
                <div className="product-price">$ 20</div>
              </div>
            </div>
          </div>
          <div className="summary">
            <h1 className="summary-title">ORDER SUMMARY</h1>
            <div className="summary-item">
              <span className="summary-item-text">Subtotal</span>
              <span className="summary-item-price">$ 80</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Estimated Shipping</span>
              <span className="summary-item-price">$ 5.90</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Shipping Discount</span>
              <span className="summary-item-price">$ -5.90</span>
            </div>
            <div className="summary-item total">
              <span className="summary-item-text">Total</span>
              <span className="summary-item-price">$ 80</span>
            </div>
            <button>CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
