import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

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
            <NavLink to="/register" className="menu-item">
              <div>REGISTER</div>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login" className="menu-item">
              <div>SIGN IN</div>
            </NavLink>
          )}
          {user && (
            <div>
              <p>Welcome, X</p>
              <button onClick={() => handleLogout()}>Logout</button>
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
