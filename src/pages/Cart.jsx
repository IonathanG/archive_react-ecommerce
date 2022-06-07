import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Add, DeleteOutline, Remove } from "@material-ui/icons";
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
  const wishList = useSelector((state) => state.cart.wishList);

  const [totalPrice, setTotalPrice] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);

  useEffect(() => {
    setTotalPrice(0);

    listItems.map((item) =>
      setTotalPrice((prevState) => prevState + item.price * item.quantity)
    );

    totalPrice >= 50 ? setFreeShipping(true) : setFreeShipping(false);
  }, [listItems, totalQuantity, totalPrice]);

  const handleQuantity = (option, item) => {
    console.log("test");
    if (option === "remove") {
      if (item.quantity > 1) dispatch(removeQuantity(item));
    } else if (option === "add")
      if (item.quantity < 9) dispatch(addQuantity(item));
  };

  return (
    <div className="cart-container">
      <div className="wrapper">
        <h1>YOUR SHOPPING BAG</h1>
        <div className="top">
          <NavLink to="/product-list">
            <button className="topButton transparent">CONTINUE SHOPPING</button>
          </NavLink>
          <div className="topTexts">
            <span className="topText">Shopping Bag ({totalQuantity})</span>
            <span className="topText">Your Wishlist ({wishList.length})</span>
          </div>
          <button className="topButton filled">CHECKOUT NOW</button>
        </div>
        <div className="bottom">
          {listItems.length === 0 && (
            <span className="empty-cart">Your Shopping Cart is empty</span>
          )}
          <div className="products-list">
            {listItems.map((item, index) => (
              <div className="product" key={index}>
                <div className="product-detail">
                  <img src={item.img} alt="product_image" />
                  <div className="details">
                    <span className="product-name">
                      <b>Product:</b> {item.name}
                    </span>
                    <span className="product-id">
                      <b>REF:</b> 123456789
                    </span>
                    <div
                      className="product-color"
                      style={{ backgroundColor: `${item.color}` }}
                    ></div>
                    <span className="product-size">
                      <b>Size:</b> {item.size}
                    </span>
                  </div>
                </div>
                <div className="price-detail">
                  <div className="product-amount-container">
                    <span onClick={() => handleQuantity("remove", item)}>
                      <Remove />
                    </span>
                    <div className="product-amount">{item.quantity}</div>
                    <span onClick={() => handleQuantity("add", item)}>
                      <Add />
                    </span>
                  </div>
                  <div className="product-price">
                    $ {item.price * item.quantity}
                  </div>
                </div>
                {listItems.length > 1 && <div className="hr"></div>}
                <DeleteOutline
                  className="delete-product"
                  onClick={() => dispatch(removeItem(index))}
                />
              </div>
            ))}
          </div>
          <div className="summary">
            <h1 className="summary-title">ORDER SUMMARY</h1>
            <div className="summary-item">
              <span className="summary-item-text">Subtotal</span>
              <span className="summary-item-price">$ {totalPrice}</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Estimated Shipping</span>
              <span className="summary-item-price">
                {listItems.length > 0 ? "$ 5.90" : "$ 0"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Shipping Discount</span>
              <span className="summary-item-price">
                $ {freeShipping ? "-5.90" : "0"}
              </span>
            </div>
            <div className="summary-item total">
              <span className="summary-item-text">Total</span>
              <span className="summary-item-price">
                $ {freeShipping ? totalPrice - 5.9 : totalPrice}
              </span>
            </div>
            <button onClick={() => dispatch(deleteCart())}>CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
