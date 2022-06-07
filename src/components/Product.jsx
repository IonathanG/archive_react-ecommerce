import {
  SearchOutlined,
  FavoriteBorderOutlined,
  Favorite,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleWishList } from "../feature/cartSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.cart.wishList);

  const navigate = useNavigate();
  const favoriteRef = useRef();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e) => {
    if (!favoriteRef.current.contains(e.target))
      navigate(`/product/${item.id}`);
    else {
      dispatch(handleWishList(item.id));
    }
  };

  useEffect(() => {
    wishList.includes(item.id) ? setIsFavorite(true) : setIsFavorite(false);
  }, [wishList, item.id]);

  return (
    <div className="product-container" onClick={(e) => handleClick(e)}>
      <div className="circle"></div>
      <img src={item.img} alt="" />
      <div className="info">
        <div className="icon">
          <SearchOutlined />
        </div>
        <div className="icon iconFavorite" ref={favoriteRef}>
          {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
        </div>
      </div>
    </div>
  );
};

export default Product;
