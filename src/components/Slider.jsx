import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useSliders from "../hooks/useSliders";

const Slider = () => {
  const sliderItems = useSliders();

  const [slideIndex, setSlideIndex] = useState(0);
  const [isSliderClicked, setIsSliderClicked] = useState(false);

  //animates the slider until click
  //useEffect cancels warning for update State on unmounted component
  useEffect(() => {
    if (!isSliderClicked) {
      const interval = setInterval(function () {
        setSlideIndex((index) => (index + 1) % 3);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isSliderClicked]);

  // left click on the slider arrow
  const onLeftClick = () => {
    setIsSliderClicked(true);
    setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
  };

  // right click on the slider arrow
  const onRightClick = () => {
    setIsSliderClicked(true);
    setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };

  return (
    <div className="slider-container">
      <div className="arrow left" onClick={() => onLeftClick()}>
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
      <div className="arrow right" onClick={() => onRightClick()}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
