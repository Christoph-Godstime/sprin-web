import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryFoodComp from "./CategoryFoodComp";
import ReusableShimmer from "./Shimmers/ReusableShimmer";

const HomeCategory = ({ category, isLoading }) => {
  const navigate = useNavigate();

  const renderCategoryFoodComp = (item) => (
    <CategoryFoodComp
      item={item}
      onClick={() => navigate("/food-nav", { state: item })}
    />
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-390px)]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (category && category.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-390px)]">
        <p className="text-[16px] font-[500] text-gray-700">
          No Item In This Category...
        </p>
      </div>
    );
  }

  return (
    <div className="px-[12px] min-h-[calc(100vh-390px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[15px] gap-y-[20px]">
        {category.map((item) => (
          <div key={item._id}>{renderCategoryFoodComp(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
