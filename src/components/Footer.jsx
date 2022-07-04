import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left">
        <h1 className="logo">IONY.</h1>
        <p className="description">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="social-container">
          <div className="social-icon" style={{ backgroundColor: "#3B5999" }}>
            <Facebook />
          </div>
          <div className="social-icon" style={{ backgroundColor: "#E4405F" }}>
            <Instagram />
          </div>
          <div className="social-icon" style={{ backgroundColor: "#55ACEE" }}>
            <Twitter />
          </div>
          <div className="social-icon" style={{ backgroundColor: "#E60023" }}>
            <Pinterest />
          </div>
        </div>
      </div>
      <div className="center">
        <h3>Useful Links</h3>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/product-list">Man Fashion</NavLink>
          </li>
          <li>
            <NavLink to="/product-list">Woman Fashion</NavLink>
          </li>
          <li>
            <NavLink to="/product-list">Accessories</NavLink>
          </li>
          <li>
            <NavLink to="/cart">My Account</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Order Tracking</NavLink>
          </li>
          <li>
            <NavLink to="/cart" state={{ wishListStatus: true }}>
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" state={{ wishListStatus: true }}>
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">Terms</NavLink>
          </li>
        </ul>
      </div>
      <div className="right">
        <h3>Contact</h3>
        <div className="contact-item">
          <Room style={{ marginRight: "10px" }} /> 350 James Way, Pismo Beach
          93449, California
        </div>
        <div className="contact-item">
          <Phone style={{ marginRight: "10px" }} /> 805 704-3900
        </div>
        <div className="contact-item">
          <MailOutline style={{ marginRight: "10px" }} />
          contact@iony.dev
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment_logo" />
      </div>
    </div>
  );
};

export default Footer;
