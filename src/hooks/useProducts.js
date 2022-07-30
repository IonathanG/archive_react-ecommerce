import { useEffect, useState } from "react";
import { popularProducts } from "../data";

const useProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(popularProducts);
  }, []);

  return data;
};

export default useProducts;
