import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import useFetchCategories from "../hooks/useCategoryHook";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { useNavigate } from "react-router-dom";
import { PlaceholderImage } from "../constants/theme";

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

  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
      <div className="flex space-x-3 py-[10px] overflow-x-auto no-scrollbar ">
        {restaurantShimmer.map((_, index) => (
          <div key={index} className="ml-3">
            <ReusableShimmer
              width={80}
              height={80}
              radius={16}
              marginRight={5}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-3 mt-[4px] overflow-x-auto no-scrollbar px-[12px] py-[10px]">
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleSelectCategory(category)}
          className={`
        flex flex-col items-center justify-center p-[4px] w-[80px] min-w-[80px]  rounded-[15px] border border-transparent shadow-md overflow-hidden
        ${category.value === selected ? "bg-orange-100" : "bg-white"}
        
      `}
        >
          <img
            src={isImageLoaded ? category.imageUrl : PlaceholderImage}
            alt={category.title}
            className={`w-full h-[55px] object-contain `}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
          />
          <p className="text-[11px] leading-3 text-center text-black  mt-[2px]">
            {category.title}
          </p>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
