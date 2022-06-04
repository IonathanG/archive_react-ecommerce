import { Send } from "@material-ui/icons";
import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h1 className="title">Newsletter</h1>
      <div className="description">
        Get timely updates from your favorite products
      </div>
      <div className="input-container">
        <input type="email" placeholder="Your email" />
        <button>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
