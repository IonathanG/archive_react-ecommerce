import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase.config";
import { setDoc, doc, collection } from "firebase/firestore";

const Register = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const confirmPassword = useRef();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const colRef = collection(db, "users");

  const handleRegister = (e) => {
    e.preventDefault();
    setError(false);
    setPasswordError(false);

    //checking for password match
    if (registerPassword.current.value === confirmPassword.current.value) {
      setLoading(true);
      try {
        auth
          .createUserWithEmailAndPassword(
            registerEmail.current.value,
            registerPassword.current.value
          )
          .then(async (userAuth) => {
            await userAuth.user.updateProfile({
              displayName,
            });
            console.log(userAuth);
            await setDoc(doc(colRef, userAuth.user.uid), {
              listItems: [],
              totalQuantity: 0,
              wishList: [],
            }).catch((err) => console.log(err.message));

            navigate("/");
          });
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="wrapper">
        <h1>CREATE AN ACCOUNT</h1>
        <form autoComplete="on" onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Name"
            autoComplete="on"
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            required
            ref={registerPassword}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
            required
            ref={confirmPassword}
          />
          <span>{passwordError && "Passwords do not match."}</span>
          <span>{error && "An error has occured. Please try again."}</span>
          <span>{loading && "Please wait..."}</span>
          <span className="agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button type="submit">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
