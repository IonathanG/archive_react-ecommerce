import {
  SearchOutlined,
  FavoriteBorderOutlined,
  Favorite,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../feature/cartSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.cart.wishList);

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [animFavorite, setAnimFavorite] = useState(false);

  // redirect to the item page
  const handleClick = () => {
    navigate(`/product/${item.id}`);
  };

  // add/remove item from the wishlist + animation
  const handleFavorite = (e) => {
    e.stopPropagation();
    setAnimFavorite((prevState) => !prevState);
    dispatch(
      toggleWishlistItem({
        name: item.name,
        img: item.img,
        id: item.id,
      })
    );
  };

  useEffect(() => {
    if (wishList[item.id]) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    // let itemFound = false;

    // for (let i = 0; i < wishList.length; i++) {
    //   if (wishList[i].id === item.id) {
    //     itemFound = true;
    //   }
    // }
    // if (itemFound) {
    //   setIsFavorite(true);
    // } else {
    //   setIsFavorite(false);
    // }
  }, [wishList, item.id]);

  return (
    <div className="product-container" onClick={() => handleClick()}>
      <div className="circle"></div>
      <img src={item.img} alt="product_image" />
      <div className="info">
        <div className="icon">
          <SearchOutlined />
        </div>
        <div className="icon iconFavorite" onClick={(e) => handleFavorite(e)}>
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
