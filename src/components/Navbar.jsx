import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, ExitToApp } from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
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

  const [isActive, setIsActive] = useState(false);

  const btnRef = useRef();
  const menuRef = useRef();

  // open/close side menu when hamburger is clicked
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  // handle logout and redirect
  const handleLogoutClick = async () => {
    await handleLogout()
      .then(() => navigate("/"))
      .then(() => dispatch(resetStore()));
  };

  //disable scrolling on the body when menu is open
  useEffect(() => {
    isActive
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isActive]);

  //close menu if click outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (
        !btnRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setIsActive(false);
      // if (linkRef.current.contains(e.target)) console.log("link");
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-container__wrapper">
          <div className="left">
            <div
              className={`hamburger-container ${
                isActive ? "hamburger-active" : "hamburger-rest"
              }`}
              ref={btnRef}
              onClick={handleToggle}
            ></div>

            <ul
              className={`menu-list ${isActive ? "show-menu" : ""}`}
              ref={menuRef}
            >
              <li onClick={() => setIsActive(false)}>
                <NavLink
                  className={(nav) =>
                    nav.isActive
                      ? "nav-active menu-list-item"
                      : "menu-list-item"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li onClick={() => setIsActive(false)}>
                <NavLink
                  className={(nav) =>
                    nav.isActive
                      ? "nav-active menu-list-item"
                      : "menu-list-item"
                  }
                  to="/product-list"
                >
                  Fashion
                </NavLink>
              </li>
              <li onClick={() => setIsActive(false)}>
                <NavLink
                  className={(nav) =>
                    nav.isActive
                      ? "nav-active menu-list-item"
                      : "menu-list-item"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li onClick={() => setIsActive(false)}>
                <NavLink
                  className={(nav) =>
                    nav.isActive
                      ? "nav-active menu-list-item"
                      : "menu-list-item"
                  }
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
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
                className={(nav) =>
                  nav.isActive ? "nav-active menu-item" : "menu-item"
                }
                onClick={() => setShowPopup(false)}
              >
                <div>REGISTER</div>
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/login"
                className={(nav) =>
                  nav.isActive ? "nav-active menu-item" : "menu-item"
                }
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
            <NavLink to="/cart" className="menu-item-cart">
              <div>
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
      {isActive && <div className="layer-dim"></div>}
    </>
  );
};

export default Navbar;
