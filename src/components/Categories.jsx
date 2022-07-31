import React from "react";
import useCategories from "../hooks/useCategories";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  const categories = useCategories();
  return (
    <div className="categories-container">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;
