import { Send } from "@material-ui/icons";
import React, { useState } from "react";

const Newsletter = () => {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEmailSubmitted(true);
    setEmail("");
  };

  return (
    <div className="newsletter-container">
      <h1 className="title">Newsletter</h1>
      <div className="description">
        Get timely updates from your favorite products
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="input-container">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">
          <Send />
        </button>
      </form>
      <div
        className={`email-confirm ${
          isEmailSubmitted ? "email-confirm-visible" : ""
        }`}
      >
        Thank you for submitting your email!
      </div>
    </div>
  );
};

export default Newsletter;
