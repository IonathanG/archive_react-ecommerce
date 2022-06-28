import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useLayoutEffect } from "react";
import UserContext from "./context/UserContext";
import { getGuestData, getUserData } from "./feature/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./utils/firebase.config";
import About from "./pages/About";

const App = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const listItems = useSelector((state) => state.cart.listItems);
  const wishList = useSelector((state) => state.cart.wishList);
  const initUser = useSelector((state) => state.cart.wishList);

  // fetch initial firestore data for user
  // fetch initial local storage data for guest
  useEffect(() => {
    if (user) dispatch(getUserData(user.uid));
    else dispatch(getGuestData());
  }, [user, dispatch]);

  // update firestore on state change for user
  // update local storage on state change for guest
  useEffect(() => {
    if (initUser && user) {
      const docRef = doc(db, "users", user.uid);

      updateDoc(docRef, {
        listItems,
        totalQuantity,
        wishList,
      }).then(() => {
        console.log("updated");
      });
    } else if (initUser && !user) {
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

  // scroll up to the top of the page on every Link
  // const Wrapper = ({ children }) => {
  //   const location = useLocation();
  //   useLayoutEffect(() => {
  //     document.documentElement.scrollTo(0, 0);
  //   }, [location.pathname]);
  //   return children;
  // };

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
