import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import { getUserData } from "./feature/cartSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getUserData(user.uid));
  }, [user, dispatch]);

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
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
