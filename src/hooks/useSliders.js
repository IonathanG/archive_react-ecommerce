import { useEffect, useState } from "react";
import Data from "../data.json";

const useSliders = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    setSliders(Data.sliderItems);
  }, []);

  return sliders;
};

export default useSliders;
