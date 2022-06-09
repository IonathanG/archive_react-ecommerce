import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { sliderItems } from "../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSliderClicked, setIsSliderClicked] = useState(false);

  //animates the slider until click
  //useEffect cancels warning for update State on unmounted component
  useEffect(() => {
    const sliderAnim = setTimeout(function () {
      if (!isSliderClicked) setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }, 2500);

    return () => {
      if (sliderAnim) clearTimeout(sliderAnim);
    };
  });

  const handleClick = (direction) => {
    setIsSliderClicked(true);

    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="slider-container">
      <div className="arrow left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className={`wrapper slide-${slideIndex + 1}`}>
        {sliderItems.map((item) => (
          <div className={`slide slide-background-${item.id}`} key={item.id}>
            <div className="img-container">
              <img src={item.img} alt="shopping_img" />
            </div>
            <div className="info-container">
              <h1>{item.title}</h1>
              <div className="description">{item.desc}</div>
              <NavLink to="/product-list">
                <button>SHOW NOW</button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
