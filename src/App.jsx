import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <UserProvider>
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
      </UserProvider>
    </div>
  );
};

export default App;
