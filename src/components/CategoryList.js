import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import useFetchCategories from "../hooks/useCategoryHook";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { useNavigate } from "react-router-dom";

const CategoryList = ({
  setSelectedCategory,
  setSelectedSection,
  setSelectedValue,
  catValue,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const restaurantShimmer = [1, 2, 3, 4, 5, 6, 7];
  const { categories, isLoading } = useFetchCategories();

  const handleSelectCategory = (item) => {
    if (selected === item.value) {
      setSelectedCategory(null);
      setSelected(null);
      setSelectedValue(null);
      setSelectedSection(null);
    } else if (item.title === "More") {
      navigate("/more-categories");
    } else {
      setSelectedCategory(item._id);
      setSelectedValue(item.title);
      setSelected(item.value);
      setSelectedSection("category");
    }
  };

  if (isLoading) {
    return (
      <div className="flex space-x-3 mt-[4px] overflow-x-auto no-scrollbar ">
        {restaurantShimmer.map((_, index) => (
          <div key={index} className="ml-3">
            <ReusableShimmer
              width={90}
              height={90}
              radius={16}
              marginRight={5}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-3 mt-[4px] overflow-x-auto no-scrollbar ">
      {categories.map((item) => (
        <button key={item._id} onClick={() => handleSelectCategory(item)}>
          <CategoryItem category={item} selected={selected} />
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
