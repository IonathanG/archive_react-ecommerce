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

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left">
        <h1 className="logo">LAMA.</h1>
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
          <li>Home</li>
          <li>Cart</li>
          <li>Man Fashion</li>
          <li>Woman Fashion</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Whislist</li>
          <li>Whislist</li>
          <li>Terms</li>
        </ul>
      </div>
      <div className="right">
        <h3>Contact</h3>
        <div className="contact-item">
          <Room style={{ marginRight: "10px" }} /> 622 Dixie Path, South
          Tobinchester 98336
        </div>
        <div className="contact-item">
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </div>
        <div className="contact-item">
          <MailOutline style={{ marginRight: "10px" }} />
          contact@lama.dev
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment_logo" />
      </div>
    </div>
  );
};

export default Footer;
