import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
      console.log(user.user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <h1>SIGN IN</h1>
        <form autoComplete="on" onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            required
            ref={loginEmail}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            required
            ref={loginPassword}
          />
          <span>{error && "Invalid email or password"}</span>
          <span>{loading && "Login..."}</span>
          <button type="submit">LOGIN</button>
          <p className="link">DO NOT REMEMBER THE PASSWORD?</p>
          <p className="link">CREATE A NEW ACCOUNT</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
