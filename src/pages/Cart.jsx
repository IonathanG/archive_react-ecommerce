import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  addQuantity,
  removeQuantity,
  removeItem,
  deleteCart,
  handleWishList,
} from "../feature/cartSlice";

const Cart = () => {
  const { user } = useContext(UserContext);

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const listItems = useSelector((state) => state.cart.listItems);
  const wishList = useSelector((state) => state.cart.wishList);

  const [totalPrice, setTotalPrice] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);

  const location = useLocation();
  const wishListStatus = location.state;
  const [showWishList, setShowWishList] = useState(wishListStatus);

  useEffect(() => {
    setTotalPrice(0);

    listItems.map((item) =>
      setTotalPrice((prevState) => prevState + item.price * item.quantity)
    );

    totalPrice >= 50 ? setFreeShipping(true) : setFreeShipping(false);
  }, [listItems, totalPrice]);

  const handleQuantity = (option, item) => {
    if (option === "remove") {
      if (item.quantity > 1) dispatch(removeQuantity(item));
    } else if (option === "add")
      if (item.quantity < 9) dispatch(addQuantity(item));
  };

  return (
    <div className="cart-container">
      <div className="wrapper">
        <h1>{showWishList ? "YOUR WISH LIST" : "YOUR SHOPPING BAG"}</h1>
        <div className="top">
          <Link to="/product-list">
            <button className="topButton transparent">CONTINUE SHOPPING</button>
          </Link>
          <div className="topTexts">
            <span
              className={`topText ${!showWishList ? "topText-active" : ""}`}
              onClick={() => setShowWishList(false)}
            >
              Shopping Bag ({totalQuantity})
            </span>
            <span
              className={`topText ${showWishList ? "topText-active" : ""}`}
              onClick={() => setShowWishList(true)}
            >
              Your Wishlist ({wishList.length})
            </span>
          </div>
          <button
            className="topButton filled"
            onClick={() => setShowWishList(false)}
          >
            CHECKOUT NOW
          </button>
        </div>
        {!showWishList && (
          <div className="bottom-ShoppingCart">
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
            {listItems.length > 0 && (
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
                {user && (
                  <button onClick={() => dispatch(deleteCart())}>
                    CHECKOUT NOW
                  </button>
                )}
                {!user && (
                  <div className="summary-no-User">
                    {" "}
                    PLEASE{" "}
                    <Link to={"/login"} className="summary-no-User__Link">
                      LOGIN{" "}
                    </Link>
                    OR CREATE A{" "}
                    <Link to={"/register"} className="summary-no-User__Link">
                      NEW ACCOUNT{" "}
                    </Link>
                    TO CHECKOUT
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {showWishList && (
          <div className="bottom-Wishlist">
            {wishList.length === 0 && (
              <span className="empty-wishlist">Your Wishlist is empty</span>
            )}
            <div className="wishlist-container">
              {wishList.map((item, index) => (
                <div className="product" key={index}>
                  <img src={item.img} alt="product_image" />
                  <div className="details">
                    <span className="product-name">
                      <b>Product:</b> {item.name}
                    </span>
                    <div className="button-container">
                      <Link to={`/product/${item.id}`}>
                        <button className="check-button">See product</button>
                      </Link>
                      <button
                        className="remove-button"
                        onClick={() => dispatch(handleWishList(item))}
                      >
                        Remove from wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
