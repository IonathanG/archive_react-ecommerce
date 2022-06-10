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
  const [animFavorite, setAnimFavorite] = useState(false);

  const handleClick = (e) => {
    if (!favoriteRef.current.contains(e.target))
      navigate(`/product/${item.id}`);
    else {
      dispatch(
        handleWishList({
          name: item.name,
          price: item.price,
          img: item.img,
          id: item.id,
        })
      );
      setAnimFavorite((prevState) => !prevState);
    }
  };

  useEffect(() => {
    let itemFound = false;

    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i].id === item.id) itemFound = true;
    }
    itemFound ? setIsFavorite(true) : setIsFavorite(false);
  }, [wishList, item.id]);

  return (
    <div className="product-container" onClick={(e) => handleClick(e)}>
      <div className="circle"></div>
      <img src={item.img} alt="product_image" />
      <div className="info">
        <div className="icon">
          <SearchOutlined />
        </div>
        <div className="icon iconFavorite" ref={favoriteRef}>
          {isFavorite ? (
            <Favorite
              className={`isFavorite ${animFavorite ? "animFavorite" : ""}`}
            />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
