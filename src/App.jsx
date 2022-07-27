import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getGuestData, getUserData } from "./feature/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./utils/firebase.config";

import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useUser } from "./context/UserContext";

const App = () => {
  const user = useUser();

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const listItems = useSelector((state) => state.cart.listItems);
  const wishList = useSelector((state) => state.cart.wishList);
  const initUser = useSelector((state) => state.cart.wishList);

  // fetch initial firestore data for user
  // fetch initial local storage data for guest
  useEffect(() => {
    if (user.user) {
      dispatch(getUserData(user.user.uid));
    } else {
      dispatch(getGuestData());
    }
  }, [user.user, dispatch]);

  // update firestore on state change for user
  // update local storage on state change for guest
  useEffect(() => {
    if (initUser && user.user) {
      const docRef = doc(db, "users", user.user.uid);

      updateDoc(docRef, {
        listItems,
        totalQuantity,
        wishList,
      }).then(() => {
        console.log("updated");
      });
    } else if (initUser && !user.user) {
      console.log("update local storage");
      const serializedState = JSON.stringify({
        listItems,
        totalQuantity,
        wishList,
      });
      localStorage.setItem("state", serializedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listItems, totalQuantity, wishList, initUser]);

  return (
    <div className="app">
      <BrowserRouter>
        <Announcement />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
