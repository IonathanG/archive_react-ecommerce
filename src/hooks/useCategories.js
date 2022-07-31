import { useEffect, useState } from "react";
import Data from "../data.json";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(Data.categories);
  }, []);

  return categories;
};

export default useCategories;
