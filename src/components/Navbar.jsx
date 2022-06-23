import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, ExitToApp } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../feature/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, handleLogout } = useContext(UserContext);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [showPopup, setShowPopup] = useState(false);

  const handleLogoutClick = async () => {
    await handleLogout()
      .then(() => navigate("/"))
      .then(() => dispatch(resetStore()));
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container__wrapper">
        <div className="left">
          <span>EN</span>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "16" }} />
          </div>
        </div>
        <NavLink to="/" className="logo">
          <div className="center">
            <h1>IONY.</h1>
          </div>
        </NavLink>
        <div className="right">
          {!user && (
            <NavLink
              to="/register"
              className="menu-item"
              onClick={() => setShowPopup(false)}
            >
              <div>REGISTER</div>
            </NavLink>
          )}
          {!user && (
            <NavLink
              to="/login"
              className="menu-item"
              onClick={() => setShowPopup(false)}
            >
              <div>SIGN IN</div>
            </NavLink>
          )}
          {user && (
            <div className="logged-in">
              <p>
                Welcome, <span>{user.displayName}</span>
              </p>
              <ExitToApp
                className="log-out"
                onClick={() => handleLogoutClick()}
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
              ></ExitToApp>
              <div
                className={`log-out-popup ${
                  showPopup ? "log-out-popup__visible" : ""
                }`}
              >
                Sign Out
              </div>
            </div>
          )}
          <NavLink to="/cart" className="menu-item">
            <div className="menu-item">
              <Badge
                badgeContent={totalQuantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
